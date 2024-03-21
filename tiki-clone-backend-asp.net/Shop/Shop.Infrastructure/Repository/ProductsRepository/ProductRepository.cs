using Dapper;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository
{
    public class ProductRepository : WriteRepository<Product>, IProductRepository
    {
        private readonly IVariationRepositry _variationRepositry;
        public ProductRepository(IUnitOfWork unitOfWork, IVariationRepositry variationRepositry) : base(unitOfWork)
        {
            _variationRepositry = variationRepositry;
        }

        public async Task<FilterPaging<ProductResponse>> FilterPagingProductAsync(string category, int page, int size, string orderBy, Dictionary<string, string> conditions)
        {
            string sql = "SELECT #output FROM product p " +
                "JOIN category c ON p.CategoryId = c.Id " +
                "JOIN brand b ON p.BrandId = b.Id " +
                "JOIN supplier s ON p.SupplierId = s.Id " +
                "JOIN productconfiguration p1 ON p.Id = p1.ProductId " +
                "JOIN variationoptiongroup v ON p1.VariationOptionGroupId = v.Id " +
                "JOIN variationoption v1 ON v.Id = v1.VariationOptionGroupId " +
                "JOIN variation v2 ON v1.VariationId = v2.Id " +
                "WHERE c.Name = @category " +
                "#condition #paging";

            string condition = string.Empty;
            DynamicParameters parameters = new();

            parameters.Add("category", category);

            if (conditions.ContainsKey("supplier"))
            {
                string supllier = conditions["supllier"];
                condition += $"AND s.Name = @supllier";
                parameters.Add("supllier", supllier);
                conditions.Remove("supllier");
            }

            if (conditions.ContainsKey("brand"))
            {
                string brand = conditions["brand"];
                condition += $"AND b.Name = @brand";
                parameters.Add("brand", brand);
                conditions.Remove("brand");
            }

            if (conditions.ContainsKey("price"))
            {
                string price = conditions["price"];
                var priceRange = price.Split(',');
                condition += $"AND p1.Price >= @priceMin AND p1.Price <= @priceMax ";
                parameters.Add("priceMin", priceRange[0]);
                parameters.Add("priceMax", priceRange[1]);
                conditions.Remove("price");
            }

            if (conditions != null)
            {
                foreach (var c in conditions)
                {
                    // check variation
                    if (await _variationRepositry.IsHasVariationNameAsync(c.Key))
                    {
                        condition += $"AND v1.Value = @variationOption AND v2.Name = @variation";
                        parameters.Add("variationOption", c.Value);
                        parameters.Add("variation", c.Key);
                    }
                }
            }

            string sqlCountRecord = sql.Replace("#condition", condition);

            sqlCountRecord = sqlCountRecord.Replace("#output", "COUNT(p.Id)");
            sqlCountRecord = sqlCountRecord.Replace("#paging", string.Empty);

            var totalRecord = await _dbConnection.QuerySingleAsync<int>(sqlCountRecord, parameters);
            if (totalRecord == 0)
            {
                return new FilterPaging<ProductResponse>();
            }
            else
            {
                int totalPage = (int)Math.Ceiling(totalRecord * 1.0 / size);
                int currentPage = Math.Min(totalPage, page);
                int currentRecord = currentPage < totalPage ? size : totalRecord - ((currentPage - 1) * size);
                int skipRecord = (currentPage - 1) * size;

                string sort = string.Empty;
                if (!string.IsNullOrEmpty(orderBy)){
                    sort = orderBy.Replace(",", " ");
                    condition += $" ORDER BY @sort";
                    parameters.Add("sort", sort);
                }

                string filterSql = sql.Replace("#output", "p.Id, p.Name ,b.Name AS BrandName, p.Avatar, p.TotalSold, p.Hot, p.AverageStar, p1.Price, p1.Inventory");
                filterSql = filterSql.Replace("#paging", "LIMIT @skipRecord,@pageSize");

                parameters.Add("skipRecord", skipRecord);
                parameters.Add("pageSize", size);

                filterSql = filterSql.Replace("#condition", condition);

                var result = await _dbConnection.QueryAsync<ProductResponse>(filterSql, parameters);

                return new FilterPaging<ProductResponse>
                {
                    TotalPage = totalPage,
                    TotalRecord = totalRecord,
                    Page = page,
                    Size = size,
                    Sort = sort,
                    Items = result.ToList()
                };
            }
        }
    }
}

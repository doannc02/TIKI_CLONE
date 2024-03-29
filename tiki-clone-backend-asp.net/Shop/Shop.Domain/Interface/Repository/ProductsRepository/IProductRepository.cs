using Shop.Domain.Entity;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IProductRepository : IWriteRepository<Product>
    {
        /// <summary>
        /// lọc và phân trang sản phẩm theo product
        /// </summary>
        /// <param name="category"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <param name="orderBy"></param>
        /// <param name="conditions"></param>
        /// <returns></returns>
        Task<FilterPaging<ProductResponse>> FilterPagingProductAsync(string category, int page, int size, string orderBy, Dictionary<string, string> conditions);

        
    }
}

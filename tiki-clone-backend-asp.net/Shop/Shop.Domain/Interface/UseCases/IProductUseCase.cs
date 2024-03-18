using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Request;
using Shop.Domain.Model.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.UseCases
{
    public interface IProductUseCase
    {
        /// <summary>
        /// Thêm mới 1 sản phẩm
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        public Task<ProductCreateResponse> AddNewProduct(ProductForm productForm);

        /// <summary>
        /// lấy danh sách sản phẩm (đã được phân trang) theo danh mục
        /// </summary>
        /// <param name="categoryName">tên danh mục</param>
        /// <returns>danh sách sản phẩm theo danh mục</returns>
        public Task<PageResponse<ProductDTO>> PagingFilterProductByCategory(string categoryName, Dictionary<string, string> conditionFilter);
    }
}

using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Output;
using Shop.Domain.Model.Request;
using Shop.Domain.Model.Response;
using Shop.Domain.Model.Response.Base;
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
        Task<ProductCreateResponse> AddNewProduct(ProductForm productForm);

        /// <summary>
        /// lấy danh sách sản phẩm (đã được phân trang) theo danh mục
        /// </summary>
        /// <param name="categoryName">tên danh mục</param>
        /// <returns>danh sách sản phẩm theo danh mục</returns>
        Task<PageResponse<ProductResponse>> PagingFilterProductByCategoryAsync(string categoryName, Dictionary<string, string> conditionFilter);

        /// <summary>
        /// lấy chi tiết sản phẩm theo id
        /// </summary>
        /// <param name="ProductId"></param>
        /// <returns></returns>
        Task<BaseResponse<ProductDetailDTO>> GetProductDetailAsync(Guid ProductId);

    }
}

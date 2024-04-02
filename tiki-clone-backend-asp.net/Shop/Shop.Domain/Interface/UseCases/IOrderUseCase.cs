using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.UseCases
{
    public interface IOrderUseCase
    {
        /// <summary>
        /// Thêm sản phẩm vào giỏ hàng
        /// </summary>
        /// <param name="productDetailId"></param>
        /// <param name="quantity"></param>
        /// <returns></returns>
        Task AddProductToShoppingCart(Guid productDetailId, int quantity, HttpContext httpContext);

        /// <summary>
        /// Xóa sản phẩm khỏi giỏ hàng
        /// </summary>
        /// <param name="productDetailId"></param>
        /// <returns></returns>
        Task DeleteProductFromShoppingCart(Guid productDetailId);

        /// <summary>
        /// Cập nhật số lượng sản phẩm trong giỏ hàng
        /// </summary>
        /// <param name="productDetailId"></param>
        /// <param name="quantity"></param>
        /// <returns></returns>
        Task UpdateQuantityProductOnShoppingCart(Guid productDetailId, int quantity);
    }
}

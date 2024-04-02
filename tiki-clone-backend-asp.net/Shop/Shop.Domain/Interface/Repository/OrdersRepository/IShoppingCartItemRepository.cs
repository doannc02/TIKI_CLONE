using Shop.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IShoppingCartItemRepository : IWriteRepository<Shoppingcartitem>
    {
        /// <summary>
        /// kiểm tra có sản phẩm trong giỏ không, Nếu có trả về true, ngược lại trả về false
        /// </summary>
        /// <param name="productDetailId"></param>
        /// <returns></returns>
        Task<bool> IsHasCartItemAsync(Guid productDetailId);

        /// <summary>
        /// cập nhật lại số lượng sản phẩm trong giỏ hàng
        /// </summary>
        /// <param name="productDetailId"></param>
        /// <param name="quantity"></param>
        /// <returns></returns>
        Task UpdateQuantityAsync(Guid productDetailId, int quantity);
    }
}

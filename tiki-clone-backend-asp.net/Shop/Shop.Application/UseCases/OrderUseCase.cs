using Microsoft.AspNetCore.Http;
using Shop.Domain.Entity;
using Shop.Domain.Enum;
using Shop.Domain.Exceptions;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Interface.UseCases;
using Shop.Domain.Model.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.UseCases
{
    public class OrderUseCase : IOrderUseCase
    {
        private readonly IShoppingCartItemRepository _shoppingCartItemRepository;
        private readonly IProductDetailRepository _productDetailRepository;
        public OrderUseCase(IShoppingCartItemRepository shoppingCartItemRepository, IProductDetailRepository productDetailRepository)
        {
            _shoppingCartItemRepository = shoppingCartItemRepository;
            _productDetailRepository = productDetailRepository;
        }
        public async Task AddProductToShoppingCart(Guid productDetailId, int quantity, HttpContext httpContext)
        {
            // kiểm trả sản phẩm có tồn tại không
            if (!await _productDetailRepository.IsHasProductDetail(productDetailId))
            {
                // kiểm tra số lượng có lớn hơn 0 không
                if (quantity > 0)
                {
                    var user = (AuthorizeUser)httpContext.Items["User"];
                    var cartItem = new Shoppingcartitem()
                    {
                        Id = new Guid(),
                        UserId = user.Id,
                        ProductsDetailId = productDetailId,
                        Quantity = quantity
                    };
                    _ = await _shoppingCartItemRepository.CreateAsync(cartItem, null);
                }
                else
                {
                    throw new BadRequestException(ErrorCode.Invalid, $"Số lượng sản phẩm phải lớn hơn 0.");
                }

            }
            else throw new BadRequestException(ErrorCode.Invalid, $"Sản phẩm đã tồn tại trong giỏ hàng.");
        }

        public async Task DeleteProductFromShoppingCart(Guid productDetailId)
        {
            var item = await _shoppingCartItemRepository.GetByIdAsync(productDetailId);
            if (item != null)
            {
                await _shoppingCartItemRepository.Delete(item);
            }
        }

        public async Task UpdateQuantityProductOnShoppingCart(Guid productDetailId, int quantity)
        {
            // kiểm tra sản phẩm có tồn tại trong giỏ hàng không
            if (await _shoppingCartItemRepository.IsHasCartItemAsync(productDetailId))
            {
                // cập nhật lại số lượng nếu số lượng lớn hơn 0
                if(quantity > 0)
                {
                    await _shoppingCartItemRepository.UpdateQuantityAsync(productDetailId, quantity);
                }
                else throw new BadRequestException(ErrorCode.Invalid, $"Số lượng sản phẩm phải lớn hơn không.");

            } else throw new BadRequestException(ErrorCode.Invalid, $"Sản phẩm không tồn tại trong giỏ hàng");
        }

    }
}

using Shop.Application.Interface.UsersService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Shop.Application.Interface;

namespace Shop.Application.Services.UserServices
{
    public class BlackListService : IBlackListService
    {
        private readonly IMemoryCache _memoryCache;
        public readonly IUserService _userService;
        public BlackListService(IMemoryCache memoryCache, IUserService userService)
        {
            _memoryCache = memoryCache;
            _userService = userService;
        }
        public void AddToBlacklist(string token, int expTime)
        {
            // đặt thời gian hết hạn cho dữ liệu
            var cacheEntryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(expTime)
            };

            _memoryCache.Set(token, true, cacheEntryOptions);
        }

        public bool IsTokenBlacklisted(string token)
        {
            return _memoryCache.TryGetValue(token, out _);
        }

        public void RemoveFromBlacklist(string token)
        {
            _memoryCache.Remove(token);
        }
    }
}

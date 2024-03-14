using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Common
{
    public interface IHelper
    {
        /// <summary>
        /// lưu ảnh
        /// </summary>
        /// <param name="image"></param>
        /// <returns>đường dẫn của ảnh</returns>
        public Task<string> SaveImageAsync(IFormFile? image);

    }
}

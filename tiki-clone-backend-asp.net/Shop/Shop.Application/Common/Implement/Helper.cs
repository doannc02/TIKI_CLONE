using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Common
{
    public class Helper : IHelper
    {
        public async Task<string> SaveImageAsync(IFormFile? image)
        {
            if (image != null && image.Length > 0)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", image.FileName);
                using (var stream = File.Create(path))
                {
                    await image.CopyToAsync(stream);
                }

                return $"/Images/{image.FileName}";
            }
            else return string.Empty;
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Shop.Controller.Controllers
{
    [Route("v1/Api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        public ImagesController() { }

        /// <summary>
        /// lấy ảnh theo mã
        /// </summary>
        /// <param name="imageCode"></param>
        /// <returns></returns>
        [HttpGet("{imageCode}")]
        public IActionResult GetImageByCode(string imageCode)
        {
            // tìm mã ảnh
            
            // tìm ảnh được lưu trên server
            if (imageCode == "ahihi")
            {
                string file = $"{Directory.GetCurrentDirectory()}\\StaticFile\\Images\\Capture.PNG";
                if (!System.IO.File.Exists(file))
                {
                    return NotFound();
                }

                var imageBytes = System.IO.File.ReadAllBytes(file);
                var res = new Image
                {
                    ImageCode = "123",
                    ImageBytes = imageBytes,
                };
                return Ok(res);
            }
            else
            return Ok("ahuhu");
        }
        public class Image
        {
            public string ImageCode { get; set; }
            public byte[] ImageBytes { get; set; }
        }
    }
}

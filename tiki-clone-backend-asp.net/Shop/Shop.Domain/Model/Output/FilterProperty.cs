using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Output
{
    /// <summary>
    /// thông tin về các thuộc tính cần cho lọc, phân trang
    /// </summary>
    public class FilterProperty
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}

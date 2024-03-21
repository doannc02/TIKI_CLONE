using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Response
{
    public class PageResponse<T> where T : class
    {
        public string? Message { get; set; }
        public string? TraceId { get; set; }
        public FilterPaging<T>? Data { get; set; }
    }
}

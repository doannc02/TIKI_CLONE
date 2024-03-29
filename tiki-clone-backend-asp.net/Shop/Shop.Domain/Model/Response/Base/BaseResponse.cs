using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Response.Base
{
    public class BaseResponse<T> where T : class
    {
        public string Message { get; set; }

        public string TraceId { get; set; }

        public T Data { get; set; }
    }
}

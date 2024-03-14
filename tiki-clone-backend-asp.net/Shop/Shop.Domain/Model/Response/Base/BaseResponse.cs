using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Response.Base
{
    public class BaseResponse
    {
        public string Message { get; set; }

        public int TraceId { get; set; }

        public string Data { get; set; } // json string
    }
}

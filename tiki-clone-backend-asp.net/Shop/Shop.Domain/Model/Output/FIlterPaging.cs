using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Output
{
    public class FilterPaging<T> where T : class
    {
        public int TotalRecord { get; set; }
        public int TotalPage { get; set; }
        public int Page { get; set; }
        public int Size { get; set; }
        public string Sort { get; set; }

        public List<T> Items { get; set; } = new List<T>();
        public FilterPaging() { }

    }
}

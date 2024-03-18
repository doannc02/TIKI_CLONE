using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Input
{
    /// <summary>
    /// input lọc
    /// </summary>
    /// author: Trương Mạnh Quang (28/10/2023)
    public class FilterInput
    {
        public int Page { get; set; }
        public int Size { get; set; }

        public List<string> SearchField { get; set; } = new List<string>();
        public string SearchKey { get; set; } = string.Empty;
        public string Condition { get; set; } = string.Empty;

        public bool IsSearchFieldAnyEmpty()
        {
            if (SearchField == null || SearchField.Count == 0 || SearchField.Any((item) => { return item == null || item == ""; }))
            {
                return false;
            }
            return true;
        }
        public bool IsSearchKeyEmpty()
        {
            return SearchKey == string.Empty;
        }

        public bool IsConditionEmpty()
        {
            return Condition == string.Empty;
        }

        
    }
}

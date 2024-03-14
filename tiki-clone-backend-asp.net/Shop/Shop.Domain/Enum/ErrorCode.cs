using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Enum
{
    public enum ErrorCode
    {
        NoError = 0,
        Error = 1,
        Valid = 2,
        Invalid = 3,
        DuplicateCode = 4,
        InvalidInput = 5,
        InvalidConstrant = 6,
        TokenIsDenied = 7,
    }
}

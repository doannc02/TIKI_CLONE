using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Categorydiscount
{
    public Guid Id { get; set; }

    public Guid? DiscountId { get; set; }

    public Guid? CategoryId { get; set; }

    public sbyte? Status { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Discount? Discount { get; set; }
}

using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Productdiscount
{
    public Guid Id { get; set; }

    public Guid? DiscountId { get; set; }

    public Guid? ProductsId { get; set; }

    public sbyte? Status { get; set; }

    public virtual Discount? Discount { get; set; }

    public virtual Product? Products { get; set; }
}

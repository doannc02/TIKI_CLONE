using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Shoppingcartitem
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public Guid? ProductsDetailId { get; set; }

    public int? Quantity { get; set; }

    public virtual Productdetail? ProductsDetail { get; set; }

    public virtual User? User { get; set; }
}

using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Orderitem
{
    public Guid Id { get; set; }

    public Guid? OrderId { get; set; }

    public Guid? ProductDetailId { get; set; }

    public double? Price { get; set; }

    public int? Quantity { get; set; }

    public double? TotalPrice { get; set; }

    public string? ProductName { get; set; }

    public string? ProductAvatar { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Productdetail? ProductDetail { get; set; }
}

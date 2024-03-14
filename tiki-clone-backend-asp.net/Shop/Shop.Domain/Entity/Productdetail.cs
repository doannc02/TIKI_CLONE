using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Productdetail
{
    public Guid Id { get; set; }

    public Guid? ProductId { get; set; }

    public string? Name { get; set; }

    public string? Brand { get; set; }

    public string? InfoDetail { get; set; }

    public string? Discription { get; set; }

    public int? TotalSell { get; set; }

    public int? TotalRating { get; set; }

    public int? TotalStar { get; set; }

    public virtual ICollection<Orderitem> Orderitems { get; set; } = new List<Orderitem>();

    public virtual Product? Product { get; set; }

    public virtual ICollection<Productimage> Productimages { get; set; } = new List<Productimage>();

    public virtual ICollection<Shoppingcartitem> Shoppingcartitems { get; set; } = new List<Shoppingcartitem>();
}

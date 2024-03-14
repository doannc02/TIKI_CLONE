using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Product
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public string? Avatar { get; set; }

    public int? TotalSold { get; set; }

    public decimal? AverageStar { get; set; }

    public int? Hot { get; set; }

    public sbyte? Status { get; set; }

    public Guid? CategoryId { get; set; }

    public Guid? BrandId { get; set; }

    public Guid? SupplierId { get; set; }

    public virtual Brand? Brand { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Productconfiguration> Productconfigurations { get; set; } = new List<Productconfiguration>();

    public virtual ICollection<Productdetail> Productdetails { get; set; } = new List<Productdetail>();

    public virtual ICollection<Productdiscount> Productdiscounts { get; set; } = new List<Productdiscount>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual Supplier? Supplier { get; set; }

    public virtual ICollection<Viewedproduct> Viewedproducts { get; set; } = new List<Viewedproduct>();
}

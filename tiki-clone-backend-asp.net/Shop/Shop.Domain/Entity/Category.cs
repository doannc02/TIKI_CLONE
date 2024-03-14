using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Category
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public Guid? ParentId { get; set; }

    public string? Discription { get; set; }

    public string? Avatar { get; set; }

    public int? Hot { get; set; }

    public sbyte? Status { get; set; }

    public virtual ICollection<Categorydiscount> Categorydiscounts { get; set; } = new List<Categorydiscount>();

    public virtual ICollection<Category> InverseParent { get; set; } = new List<Category>();

    public virtual Category? Parent { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}

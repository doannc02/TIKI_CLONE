using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Brand
{
    public Guid Id { get; set; }

    public string Code { get; set; } = null!;

    public string? Name { get; set; }

    public string? Country { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}

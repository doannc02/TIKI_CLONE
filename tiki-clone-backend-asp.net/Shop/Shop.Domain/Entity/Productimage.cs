using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Productimage
{
    public Guid Id { get; set; }

    public Guid? ProductDetailId { get; set; }

    public string? Name { get; set; }

    public string? Path { get; set; }

    public virtual Productdetail? ProductDetail { get; set; }

    public virtual ICollection<Productconfiguration> Productconfigurations { get; set; } = new List<Productconfiguration>();
}

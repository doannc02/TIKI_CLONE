using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Variation
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Discription { get; set; }

    public virtual ICollection<Variationoption> Variationoptions { get; set; } = new List<Variationoption>();
}

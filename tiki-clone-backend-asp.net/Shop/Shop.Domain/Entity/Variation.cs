using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Variation
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Discription { get; set; }

    public virtual ICollection<Filterproperty> Filterproperties { get; set; } = new List<Filterproperty>();

    public virtual ICollection<Variationoption> Variationoptions { get; set; } = new List<Variationoption>();
}

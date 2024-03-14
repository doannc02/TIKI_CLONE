using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Variationoptiongroup
{
    public Guid Id { get; set; }

    public string? Discription { get; set; }

    public virtual ICollection<Productconfiguration> Productconfigurations { get; set; } = new List<Productconfiguration>();

    public virtual ICollection<Variationoption> Variationoptions { get; set; } = new List<Variationoption>();
}

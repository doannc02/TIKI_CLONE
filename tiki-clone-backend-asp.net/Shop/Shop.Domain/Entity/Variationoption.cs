using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Variationoption
{
    public Guid Id { get; set; }

    public Guid? VariationId { get; set; }

    public Guid? VariationOptionGroupId { get; set; }

    public string? Value { get; set; }

    public virtual Variation? Variation { get; set; }

    public virtual Variationoptiongroup? VariationOptionGroup { get; set; }
}

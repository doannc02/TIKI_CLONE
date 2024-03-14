using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Productconfiguration
{
    public Guid Id { get; set; }

    public Guid? ProductId { get; set; }

    public Guid? ProductImageId { get; set; }

    public Guid? VariationOptionGroupId { get; set; }

    public decimal? Price { get; set; }

    public int? Inventory { get; set; }

    public string? Sku { get; set; }

    public sbyte? AverageStar { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Productimage? ProductImage { get; set; }

    public virtual Variationoptiongroup? VariationOptionGroup { get; set; }
}

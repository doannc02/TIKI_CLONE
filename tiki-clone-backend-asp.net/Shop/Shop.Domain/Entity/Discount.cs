using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Discount
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public int? Type { get; set; }

    public double? Value { get; set; }

    public sbyte? Status { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public virtual ICollection<Categorydiscount> Categorydiscounts { get; set; } = new List<Categorydiscount>();

    public virtual ICollection<Productdiscount> Productdiscounts { get; set; } = new List<Productdiscount>();
}

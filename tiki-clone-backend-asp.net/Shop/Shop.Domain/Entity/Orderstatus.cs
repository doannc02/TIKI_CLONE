using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Orderstatus
{
    public Guid Id { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<Orderhistorystatus> Orderhistorystatuses { get; set; } = new List<Orderhistorystatus>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}

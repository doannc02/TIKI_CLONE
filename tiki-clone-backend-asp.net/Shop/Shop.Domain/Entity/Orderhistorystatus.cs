using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Orderhistorystatus
{
    public Guid Id { get; set; }

    public Guid? OrderId { get; set; }

    public Guid? StatusId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Orderstatus? Status { get; set; }
}

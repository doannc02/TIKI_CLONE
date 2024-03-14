using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Paymenttype
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Userpaymentmethod> Userpaymentmethods { get; set; } = new List<Userpaymentmethod>();
}

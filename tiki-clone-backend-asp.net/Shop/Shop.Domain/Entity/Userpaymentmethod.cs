using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Userpaymentmethod
{
    public Guid Id { get; set; }

    public Guid? OrderId { get; set; }

    public Guid? UserId { get; set; }

    public Guid? PaymentTypeId { get; set; }

    public string? Provider { get; set; }

    public string? AccountNumber { get; set; }

    public bool? IsDefault { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Paymenttype? PaymentType { get; set; }

    public virtual User? User { get; set; }
}

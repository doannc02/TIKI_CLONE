using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Order
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public Guid? UserId { get; set; }

    public Guid? UserPaymentMethodId { get; set; }

    public double? ShippingtFee { get; set; }

    public string? ShippingAddress { get; set; }

    public double? TotalPrice { get; set; }

    public Guid? OrderStatus { get; set; }

    public DateTime? OrderDate { get; set; }

    public virtual Orderstatus? OrderStatusNavigation { get; set; }

    public virtual ICollection<Orderhistorystatus> Orderhistorystatuses { get; set; } = new List<Orderhistorystatus>();

    public virtual ICollection<Orderitem> Orderitems { get; set; } = new List<Orderitem>();

    public virtual User? User { get; set; }

    public virtual ICollection<Userpaymentmethod> Userpaymentmethods { get; set; } = new List<Userpaymentmethod>();
}

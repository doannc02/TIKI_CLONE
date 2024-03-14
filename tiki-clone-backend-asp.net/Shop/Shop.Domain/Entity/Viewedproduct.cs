using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Viewedproduct
{
    public Guid Id { get; set; }

    public Guid? ProductId { get; set; }

    public Guid? UserId { get; set; }

    public DateTime? Date { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User? User { get; set; }
}

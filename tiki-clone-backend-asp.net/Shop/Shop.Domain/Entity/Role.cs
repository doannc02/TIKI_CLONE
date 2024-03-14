using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Role
{
    public Guid Id { get; set; }

    public int? Code { get; set; }

    public string? Name { get; set; }

    public string? Discription { get; set; }

    public sbyte? Status { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}

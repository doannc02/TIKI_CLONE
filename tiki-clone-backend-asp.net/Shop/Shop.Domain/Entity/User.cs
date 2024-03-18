using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class User
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public string? Password { get; set; }

    public Guid? RoleId { get; set; }

    public string? Avatar { get; set; }

    public string? FullName { get; set; }

    public sbyte? Gender { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public sbyte? Age { get; set; }

    public string? Email { get; set; }

    public sbyte? Status { get; set; }

    public string? RefreshToken { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<Shoppingcartitem> Shoppingcartitems { get; set; } = new List<Shoppingcartitem>();

    public virtual ICollection<Userpaymentmethod> Userpaymentmethods { get; set; } = new List<Userpaymentmethod>();

    public virtual ICollection<Viewedproduct> Viewedproducts { get; set; } = new List<Viewedproduct>();
}

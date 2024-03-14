using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Rating
{
    public Guid Id { get; set; }

    public int? Stars { get; set; }

    public string? Content { get; set; }

    public Guid? ProductsId { get; set; }

    public Guid? UserId { get; set; }

    public DateTime? RatingAt { get; set; }

    public virtual Product? Products { get; set; }

    public virtual User? User { get; set; }
}

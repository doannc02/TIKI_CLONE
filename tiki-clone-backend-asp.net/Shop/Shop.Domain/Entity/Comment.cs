using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Comment
{
    public Guid Id { get; set; }

    public Guid? ParentId { get; set; }

    public string? Content { get; set; }

    public byte? Star { get; set; }

    public Guid ProductId { get; set; }

    public Guid UserId { get; set; }

    public DateTime? CommentAt { get; set; }

    public virtual ICollection<Comment> InverseParent { get; set; } = new List<Comment>();

    public virtual Comment? Parent { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}

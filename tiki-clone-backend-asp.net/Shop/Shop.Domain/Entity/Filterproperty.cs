using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

/// <summary>
/// Các thuộc tính dùng cho việc lọc phân trang
/// </summary>
public partial class Filterproperty
{
    public int Id { get; set; }

    public string Code { get; set; }

    public Guid CategoryId { get; set; }

    public Guid VariationId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual Variation Variation { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace Shop.Domain.Entity;

public partial class Slice
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Avatar { get; set; }

    public string? Link { get; set; }
}

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Shop.Domain.Entity;

namespace Shop.Infrastructure.Repository;

public partial class ShopDbContext : DbContext
{
    public ShopDbContext()
    {
    }

    public ShopDbContext(DbContextOptions<ShopDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Categorydiscount> Categorydiscounts { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Discount> Discounts { get; set; }

    public virtual DbSet<Filterproperty> Filterproperties { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Orderhistorystatus> Orderhistorystatuses { get; set; }

    public virtual DbSet<Orderitem> Orderitems { get; set; }

    public virtual DbSet<Orderstatus> Orderstatuses { get; set; }

    public virtual DbSet<Paymenttype> Paymenttypes { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Productconfiguration> Productconfigurations { get; set; }

    public virtual DbSet<Productdetail> Productdetails { get; set; }

    public virtual DbSet<Productdiscount> Productdiscounts { get; set; }

    public virtual DbSet<Productimage> Productimages { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Shoppingcartitem> Shoppingcartitems { get; set; }

    public virtual DbSet<Slice> Slices { get; set; }

    public virtual DbSet<Supplier> Suppliers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Userpaymentmethod> Userpaymentmethods { get; set; }

    public virtual DbSet<Variation> Variations { get; set; }

    public virtual DbSet<Variationoption> Variationoptions { get; set; }

    public virtual DbSet<Variationoptiongroup> Variationoptiongroups { get; set; }

    public virtual DbSet<Viewedproduct> Viewedproducts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=shop;uid=root;pwd=12345678910", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.30-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("brand");

            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .HasDefaultValueSql("''")
                .IsFixedLength();
            entity.Property(e => e.Country)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("category");

            entity.HasIndex(e => e.ParentId, "ParentId");

            entity.Property(e => e.Avatar).HasColumnType("text");
            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.Discription).HasColumnType("text");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("category_ibfk_1");
        });

        modelBuilder.Entity<Categorydiscount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("categorydiscount");

            entity.HasIndex(e => e.CategoryId, "CategoryId");

            entity.HasIndex(e => e.DiscountId, "DiscountId");

            entity.HasOne(d => d.Category).WithMany(p => p.Categorydiscounts)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("categorydiscount_ibfk_2");

            entity.HasOne(d => d.Discount).WithMany(p => p.Categorydiscounts)
                .HasForeignKey(d => d.DiscountId)
                .HasConstraintName("categorydiscount_ibfk_1");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("comment");

            entity.HasIndex(e => e.ParentId, "ParentId");

            entity.HasIndex(e => e.ProductId, "ProductsId");

            entity.HasIndex(e => e.UserId, "comment_ibfk_3");

            entity.Property(e => e.CommentAt).HasColumnType("datetime");
            entity.Property(e => e.Content).HasColumnType("text");
            entity.Property(e => e.ProductId).HasDefaultValueSql("''");
            entity.Property(e => e.UserId).HasDefaultValueSql("''");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("comment_ibfk_1");

            entity.HasOne(d => d.Product).WithMany(p => p.Comments)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("comment_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("comment_ibfk_3");
        });

        modelBuilder.Entity<Discount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("discount");

            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Filterproperty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("filterproperty", tb => tb.HasComment("Các thuộc tính dùng cho việc lọc phân trang"));

            entity.HasIndex(e => e.CategoryId, "CategoryId");

            entity.HasIndex(e => e.VariationId, "VariationId");

            entity.Property(e => e.CategoryId).HasDefaultValueSql("''");
            entity.Property(e => e.Code).HasMaxLength(255);
            entity.Property(e => e.VariationId).HasDefaultValueSql("''");

            entity.HasOne(d => d.Category).WithMany(p => p.Filterproperties)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("filterproperty_ibfk_1");

            entity.HasOne(d => d.Variation).WithMany(p => p.Filterproperties)
                .HasForeignKey(d => d.VariationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("filterproperty_ibfk_2");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("order");

            entity.HasIndex(e => e.OrderStatus, "OrderStatus");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.OrderDate).HasColumnType("datetime");
            entity.Property(e => e.ShippingAddress).HasColumnType("text");

            entity.HasOne(d => d.OrderStatusNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.OrderStatus)
                .HasConstraintName("order_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("order_ibfk_1");
        });

        modelBuilder.Entity<Orderhistorystatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orderhistorystatus");

            entity.HasIndex(e => e.OrderId, "OrderId");

            entity.HasIndex(e => e.StatusId, "StatusId");

            entity.Property(e => e.Date).HasColumnType("datetime");

            entity.HasOne(d => d.Order).WithMany(p => p.Orderhistorystatuses)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("orderhistorystatus_ibfk_1");

            entity.HasOne(d => d.Status).WithMany(p => p.Orderhistorystatuses)
                .HasForeignKey(d => d.StatusId)
                .HasConstraintName("orderhistorystatus_ibfk_2");
        });

        modelBuilder.Entity<Orderitem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orderitem");

            entity.HasIndex(e => e.OrderId, "OrderId");

            entity.HasIndex(e => e.ProductDetailId, "ProductDetailId");

            entity.Property(e => e.ProductAvatar).HasMaxLength(255);
            entity.Property(e => e.ProductName)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");

            entity.HasOne(d => d.Order).WithMany(p => p.Orderitems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("orderitem_ibfk_1");

            entity.HasOne(d => d.ProductDetail).WithMany(p => p.Orderitems)
                .HasForeignKey(d => d.ProductDetailId)
                .HasConstraintName("orderitem_ibfk_2");
        });

        modelBuilder.Entity<Orderstatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orderstatus");
        });

        modelBuilder.Entity<Paymenttype>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("paymenttype");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("product");

            entity.HasIndex(e => e.BrandId, "BrandId");

            entity.HasIndex(e => e.CategoryId, "CategoryId");

            entity.HasIndex(e => e.SupplierId, "SupplierId");

            entity.Property(e => e.Avatar).HasColumnType("text");
            entity.Property(e => e.AverageStar).HasColumnType("decimal(2,1) unsigned");
            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");

            entity.HasOne(d => d.Brand).WithMany(p => p.Products)
                .HasForeignKey(d => d.BrandId)
                .HasConstraintName("product_ibfk_2");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("product_ibfk_1");

            entity.HasOne(d => d.Supplier).WithMany(p => p.Products)
                .HasForeignKey(d => d.SupplierId)
                .HasConstraintName("product_ibfk_3");
        });

        modelBuilder.Entity<Productconfiguration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("productconfiguration");

            entity.HasIndex(e => e.ProductId, "ProductId");

            entity.HasIndex(e => e.ProductImageId, "ProductImageId");

            entity.HasIndex(e => e.VariationOptionGroupId, "productconfiguration_ibfk_4");

            entity.Property(e => e.Price).HasPrecision(19, 2);
            entity.Property(e => e.Sku)
                .HasMaxLength(255)
                .HasColumnName("SKU");

            entity.HasOne(d => d.Product).WithMany(p => p.Productconfigurations)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("productconfiguration_ibfk_5");

            entity.HasOne(d => d.ProductImage).WithMany(p => p.Productconfigurations)
                .HasForeignKey(d => d.ProductImageId)
                .HasConstraintName("productconfiguration_ibfk_3");

            entity.HasOne(d => d.VariationOptionGroup).WithMany(p => p.Productconfigurations)
                .HasForeignKey(d => d.VariationOptionGroupId)
                .HasConstraintName("productconfiguration_ibfk_4");
        });

        modelBuilder.Entity<Productdetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("productdetail");

            entity.HasIndex(e => e.ProductId, "ProductId");

            entity.Property(e => e.Brand).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.Product).WithMany(p => p.Productdetails)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("productdetail_ibfk_1");
        });

        modelBuilder.Entity<Productdiscount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("productdiscount");

            entity.HasIndex(e => e.DiscountId, "DiscountId");

            entity.HasIndex(e => e.ProductsId, "ProductsId");

            entity.HasOne(d => d.Discount).WithMany(p => p.Productdiscounts)
                .HasForeignKey(d => d.DiscountId)
                .HasConstraintName("productdiscount_ibfk_1");

            entity.HasOne(d => d.Products).WithMany(p => p.Productdiscounts)
                .HasForeignKey(d => d.ProductsId)
                .HasConstraintName("productdiscount_ibfk_2");
        });

        modelBuilder.Entity<Productimage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("productimage");

            entity.HasIndex(e => e.ProductDetailId, "ProductId");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Path).HasMaxLength(255);

            entity.HasOne(d => d.ProductDetail).WithMany(p => p.Productimages)
                .HasForeignKey(d => d.ProductDetailId)
                .HasConstraintName("productimage_ibfk_1");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("rating");

            entity.HasIndex(e => e.ProductsId, "ProductsId");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.Property(e => e.Content).HasColumnType("text");
            entity.Property(e => e.RatingAt).HasColumnType("datetime");

            entity.HasOne(d => d.Products).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.ProductsId)
                .HasConstraintName("rating_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("rating_ibfk_2");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Discription).HasColumnType("text");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Shoppingcartitem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("shoppingcartitem");

            entity.HasIndex(e => e.ProductsDetailId, "ProductsDetailId");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.HasOne(d => d.ProductsDetail).WithMany(p => p.Shoppingcartitems)
                .HasForeignKey(d => d.ProductsDetailId)
                .HasConstraintName("shoppingcartitem_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Shoppingcartitems)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("shoppingcartitem_ibfk_1");
        });

        modelBuilder.Entity<Slice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("slice");

            entity.Property(e => e.Avatar).HasColumnType("text");
            entity.Property(e => e.Link).HasColumnType("text");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("supplier");

            entity.Property(e => e.Address).HasColumnType("text");
            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.Country)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Phone)
                .HasMaxLength(100)
                .IsFixedLength();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.RoleId, "RoleId");

            entity.Property(e => e.Address).HasColumnType("text");
            entity.Property(e => e.Avatar).HasColumnType("text");
            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(100)
                .IsFixedLength();
            entity.Property(e => e.RefreshToken).HasMaxLength(5000);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("user_ibfk_1");
        });

        modelBuilder.Entity<Userpaymentmethod>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("userpaymentmethod");

            entity.HasIndex(e => e.OrderId, "OrderId");

            entity.HasIndex(e => e.PaymentTypeId, "PaymentTypeId");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.Property(e => e.AccountNumber)
                .HasMaxLength(255)
                .IsFixedLength();
            entity.Property(e => e.Provider).HasMaxLength(255);

            entity.HasOne(d => d.Order).WithMany(p => p.Userpaymentmethods)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("userpaymentmethod_ibfk_1");

            entity.HasOne(d => d.PaymentType).WithMany(p => p.Userpaymentmethods)
                .HasForeignKey(d => d.PaymentTypeId)
                .HasConstraintName("userpaymentmethod_ibfk_3");

            entity.HasOne(d => d.User).WithMany(p => p.Userpaymentmethods)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("userpaymentmethod_ibfk_2");
        });

        modelBuilder.Entity<Variation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("variation");

            entity.Property(e => e.Discription).HasColumnType("text");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Variationoption>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("variationoption");

            entity.HasIndex(e => e.VariationId, "VariationId");

            entity.HasIndex(e => e.VariationOptionGroupId, "VariationOptionGroupId");

            entity.Property(e => e.Value)
                .HasMaxLength(255)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");

            entity.HasOne(d => d.Variation).WithMany(p => p.Variationoptions)
                .HasForeignKey(d => d.VariationId)
                .HasConstraintName("variationoption_ibfk_1");

            entity.HasOne(d => d.VariationOptionGroup).WithMany(p => p.Variationoptions)
                .HasForeignKey(d => d.VariationOptionGroupId)
                .HasConstraintName("variationoption_ibfk_2");
        });

        modelBuilder.Entity<Variationoptiongroup>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("variationoptiongroup");

            entity.Property(e => e.Id).HasDefaultValueSql("''");
            entity.Property(e => e.Discription).HasColumnType("text");
        });

        modelBuilder.Entity<Viewedproduct>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("viewedproduct");

            entity.HasIndex(e => e.ProductId, "ProductId");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.Property(e => e.Date).HasColumnType("datetime");

            entity.HasOne(d => d.Product).WithMany(p => p.Viewedproducts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("viewedproduct_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.Viewedproducts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("viewedproduct_ibfk_2");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

global using Shop.Domain.Enum;
using Shop.Application.Interface;
using Shop.Application.UnitOfWork;
using Shop.Infrastructure.Repository;
using Shop.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using Shop.Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Shop.Controller.Middleware;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Interface.UseCases;
using Shop.Application.UseCases;
using Shop.Application.Services.UserServices;
using Shop.Application.Interface.UsersService;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.ProductsService;
using Shop.Infrastructure.Repository.ProductsRepository;
using Shop.Domain.Interface.Repository.ProductsRepository;
using Shop.Application.Common;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "ShopApp",
                      policy =>
                      {
                          policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
                      });
});

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState.Values
            .SelectMany(x => x.Errors)
            .Select(e => e.ErrorMessage);
            var jsonError = JsonSerializer.Serialize(errors, new JsonSerializerOptions
            {
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.All)
            });
            List<string>? arrError = JsonSerializer.Deserialize<List<string>>(jsonError);
            //return new BadRequestObjectResult(arrError);
            return new BadRequestObjectResult(new BaseException()
            {
                ErrorCode = 0,
                UserMessage = arrError,
                DevMessage = "Lỗi nhập liệu",
                TraceId = "",
                MoreInfo = "",
            });
        };
    });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IHelper, Helper>();

builder.Services.AddScoped<IUnitOfWork>(option => new UnitOfWork(new ShopDbContext(builder.Configuration.GetConnectionString("MySQL"))));

builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();

builder.Services.AddScoped<IUserUseCase, UserUseCase>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();


builder.Services.AddScoped<IProductUseCase, ProductUseCase>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductDetailService, ProductDetailService>();
builder.Services.AddScoped<IProductDetailRepository, ProductDetailRepository>();
builder.Services.AddScoped<IProductImageService, ProductImageService>();
builder.Services.AddScoped<IProductImageRepository, ProductImageRepository>();
builder.Services.AddScoped<IProductConfigurationService, ProductConfigService>();
builder.Services.AddScoped<IProductConfigurationRepository, ProductConfigurationRepository>();

builder.Services.AddScoped<IVariationService, VariationService>();
builder.Services.AddScoped<IVariationRepositry, VariationRepository>();
builder.Services.AddScoped<IVariationOptionService, VariationOptionService>();
builder.Services.AddScoped<IVariationOptionRepository, VariationOptionRepository>();
builder.Services.AddScoped<IVariationOptionGroupService, VariationOptionGroupService>();
builder.Services.AddScoped<IVariationOptionGroupRepository, VariationOptionGroupRepository>();

builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<IBrandRepository, BrandRepository>();

builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();



builder.Services.AddMemoryCache();
builder.Services.AddScoped<IBlackListService, BlackListService>();

// Cấu hình logging
builder.Services.AddLogging(option =>
        {
            option.AddConsole(); // Có thể thay bằng các loại logger khác
            option.AddDebug();            
        });

//builder.Services.AddAuthentication(option =>
//{
//    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(jwt =>
//{
//    var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtConfig:Secret").Value);
//    var issuer = builder.Configuration.GetSection("JwtConfig:Issuer").Value;
//    var audience = builder.Configuration.GetSection("JwtConfig:Audience").Value;
//    jwt.SaveToken = true;
//    jwt.TokenValidationParameters = new TokenValidationParameters()
//    {
//        ValidIssuer = issuer,
//        ValidAudience = audience,
//        ValidateIssuerSigningKey = true,
//        IssuerSigningKey = new SymmetricSecurityKey(key),
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        RequireExpirationTime = false,
//        ValidateLifetime = true,
//    };
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHsts();

app.UseCors("ShopApp");

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

//app.UseMiddleware<LoggerMiddleware>();

app.UseMiddleware<ExceptionMiddleware>();

app.UseMiddleware<TokenBlackListMiddleware>();

app.UseMiddleware<AuthenMiddleware>();

app.Run();

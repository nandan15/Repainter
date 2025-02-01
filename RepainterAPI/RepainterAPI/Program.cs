using DataCore;
using RepainterAPI.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Shared.Contexts.Base;
using System.Reflection;
using System.Text;
using DataEntities.Enquiry;
using MediatR;
using DataServices.Enquiry.Commands;
using DataServices.Enquiry.Queries;
using DataModels.Enquiry;
using DataServices.Authentication;
using DataServices.InternalPainting.Queries;
using DataServices.Repository.InternalPainting;
using DataServices.Repository.TexturePainting;
using DataServices.Repository.WallPaneling;
using DataServices.Repository;
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Increase payload size limit
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100 * 1024 * 1024; // 100MB
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = 100 * 1024 * 1024; // 100MB
});

// Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(configuration["ConnectionString:EspressoDB"], d => d.MigrationsAssembly("DataCore")));

// Identity Configuration
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Authentication Configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = configuration["JWT:ValidAudience"],
        ValidIssuer = configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
    };
});

// Repainter Context
builder.Services.AddDbContext<RepainterContext>(opts =>
    opts.UseSqlServer(configuration["ConnectionString:EspressoDB"], d => d.MigrationsAssembly("DataCore")));

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("UI", builder =>
        builder.WithOrigins(configuration["CorsOriginAllowed"].Split(","))
               .AllowAnyHeader()
               .AllowAnyMethod());
});

// MediatR Configuration
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(GetEnquiryHandler).GetTypeInfo().Assembly);
    cfg.RegisterServicesFromAssembly(typeof(GetInternalPaintingByCustomerIdHandler).Assembly);
});

// AutoMapper Configuration
builder.Services.AddAutoMapper(typeof(EnquiryModel).Assembly);

// Dependency Injection
builder.Services.AddScoped<IUnitOfWork, RepainterUnitOfWork>();
builder.Services.AddScoped<ICurrentUser, Currentuser>();
builder.Services.AddScoped<IInternalPaintingRepository, InternalPaintingRepository>();
builder.Services.AddScoped<ITexturePaintingRepository, TexturePaintingRepository>();
builder.Services.AddScoped<IPanelingRepository, WallPanelingRepository>();

// Controllers
builder.Services.AddControllers();

// Swagger Configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Repainter API", Version = "v1" });
    c.EnableAnnotations();
    c.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Scheme = "bearer",
    });
    c.OperationFilter<AuthorizationHeaderParameterOperationFilter>();
});

var app = builder.Build();

// Middleware Pipeline
app.UseSwagger();
app.UseSwaggerUI();
app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
    {
        context.Request.Path = "/";
        await next();
    }
});


app.UseHttpsRedirection();
app.UseCors("UI");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
using DataCore;
using RepainterAPI.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Microsoft.Extensions.FileProviders;
using DataCore.Identity;
using DataModels.Enquiry;
using DataServices.Authentication;
using DataServices.CatalogService;
using DataServices.Curtain.Queries;
using DataServices.Door_Grills.Queries;
using DataServices.Enquiry.Queries;
using DataServices.Furniture.Queries;
using DataServices.IEmailService;
using DataServices.InternalPainting.Queries;
using DataServices.Package.Queries;
using DataServices.Repository.Curtain;
using DataServices.Repository.Door_Grills;
using DataServices.Repository.FileUploadStorage;
using DataServices.Repository.Furniture;
using DataServices.Repository.InternalPainting;
using DataServices.Repository.Package;
using DataServices.Repository.TexturePainting;
using DataServices.Repository.WallPaneling;
using DataServices.Repository.Wallpaper;
using DataServices.Repository;
using DataServices.TexturePainting.Queries;
using DataServices.WallPaneling.Queries;
using DataServices.WhatsApp;
using Microsoft.AspNetCore.Http.Features;
using Shared.Contexts.Base;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Caching.StackExchangeRedis;
using DataServices.Repository.CustomerRepository;
using DataServices.Customer;
using DataServices.Mappings;
var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Configure services
ConfigureServices(builder);

var app = builder.Build();

// Configure middleware pipeline
ConfigureMiddleware(app);

// Ensure upload directories exist
ConfigureUploadDirectories(app);

app.Run();

void ConfigureServices(WebApplicationBuilder builder)
{
    // Configure IIS
    builder.Services.Configure<IISServerOptions>(options =>
    {
        options.MaxRequestBodySize = 300 * 1024 * 1024; // 300MB
    });

    // Configure Kestrel
    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.Limits.MaxRequestBodySize = 300 * 1024 * 1024; // 300MB
        serverOptions.Limits.MaxRequestBufferSize = 300 * 1024 * 1024; // 300MB
        serverOptions.Limits.MinRequestBodyDataRate = null;
        serverOptions.Limits.MinResponseDataRate = null;
    });

    // Configure Form Options
    builder.Services.Configure<FormOptions>(options =>
    {
        options.MultipartBodyLengthLimit = 300 * 1024 * 1024; // 300MB
        options.ValueLengthLimit = 300 * 1024 * 1024; // 300MB
        options.MemoryBufferThreshold = 300 * 1024 * 1024; // 300MB
    });

    // Configure Request Size Limits
    builder.Services.Configure<KestrelServerOptions>(options =>
    {
        options.Limits.MaxRequestBodySize = 300 * 1024 * 1024; // 300MB
    });

    builder.Services.Configure<IISServerOptions>(options =>
    {
        options.MaxRequestBodySize = 300 * 1024 * 1024; // 300MB
    });

    // Database configuration
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(configuration["ConnectionString:EspressoDB"]));

    builder.Services.AddDbContext<RepainterContext>(opts =>
        opts.UseSqlServer(configuration["ConnectionString:EspressoDB"]));

    // Identity configuration
    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

    // JWT Authentication
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

    // CORS configuration
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("UI", policyBuilder =>
        {
            var corsOriginAllowed = configuration["CorsOriginAllowed"];
            if (!string.IsNullOrEmpty(corsOriginAllowed))
            {
                policyBuilder.WithOrigins(corsOriginAllowed.Split(','))
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            }
            else
            {
                policyBuilder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            }
        });
    });

    // Register IDistributedCache (Redis)
    builder.Services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = configuration["Redis:Configuration"];
        options.InstanceName = configuration["Redis:InstanceName"];
    });

    // MediatR and AutoMapper
    builder.Services.AddMediatR(cfg => {
        cfg.RegisterServicesFromAssemblies(
            typeof(GetEnquiryHandler).Assembly,
            typeof(GetInternalPaintingByCustomerIdHandler).Assembly,
            typeof(GetCurtainByCustomerId).Assembly,
            typeof(GetWallpaperByCustomerId).Assembly,
            typeof(GetPanelingByCustomerId).Assembly,
            typeof(GetFurnitureByCustomerId).Assembly,
            typeof(GetDoor_GrillByCustomerId).Assembly,
            typeof(GetTexturePaintingByCustomerId).Assembly,
            typeof(GetPackageByCustomerId).Assembly
        );
    });

    // Add this line to your RegisterServices method
    builder.Services.AddAutoMapper(typeof(EnquiryModel).Assembly, typeof(EnquiryMappingProfile).Assembly);

    // Register services
    RegisterServices(builder.Services);

    // Swagger configuration
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

    builder.Services.AddControllers();
}
void ConfigureMiddleware(WebApplication app)
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDeveloperExceptionPage();
    }

    app.UseHttpsRedirection();

    // Static files configuration with increased size limits
    var staticFileOptions = new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
        RequestPath = "",
        OnPrepareResponse = ctx =>
        {
            ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
            ctx.Context.Response.Headers.Append(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
        }
    };

    app.UseStaticFiles(staticFileOptions);

    app.UseCors("UI");
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
}

void ConfigureUploadDirectories(WebApplication app)
{
    var uploadPaths = new[]
    {
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads"),
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "upload", "floor"),
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "upload", "site")
    };

    foreach (var path in uploadPaths)
    {
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
    }
}

void RegisterServices(IServiceCollection services)
{
    services.AddScoped<ICustomerRepository, CustomerRepository>();
    services.AddScoped<ICustomerService, CustomerService>();
    services.AddScoped<IUnitOfWork, RepainterUnitOfWork>();
    services.AddScoped<ICurrentUser, CurrentUser>();
    services.AddScoped<IInternalPaintingRepository, InternalPaintingRepository>();
    services.AddScoped<ITexturePaintingRepository, TexturePaintingRepository>();
    services.AddScoped<IPanelingRepository, WallPanelingRepository>();
    services.AddScoped<ICurtainRepository, CurtainRepository>();
    services.AddScoped<IFurnitureRepository, FurnitureRepository>();
    services.AddScoped<IDoor_GrillRepository, Door_GrillsRepository>();
    services.AddScoped<IWallpaperRepository, WallpaperRepository>();
    services.AddScoped<IPackageRepository, PackageRepository>();
    services.AddScoped<IFileStorageService, FileStorageService>();
    services.AddScoped<ICatalogService, CatalogService>();
    services.AddScoped<WhatsAppService>();
    services.AddScoped<IEmailService, EmailService>();

    services.AddHttpClient<WhatsAppService>();
    services.AddLogging();
}
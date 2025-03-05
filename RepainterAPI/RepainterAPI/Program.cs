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
using DataServices.CurtainData;
using DataServices.Repository.CurtainData;

var builder = WebApplication.CreateBuilder(args);
ConfigureServices(builder);
var app = builder.Build();
ConfigureMiddleware(app);
ConfigureUploadDirectories(app);

app.Run();

void ConfigureServices(WebApplicationBuilder builder)
{
    builder.Services.Configure<IISServerOptions>(options =>
    {
        options.MaxRequestBodySize = 300 * 1024 * 1024;
    });
    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.Limits.MaxRequestBodySize = 300 * 1024 * 1024;
        serverOptions.Limits.MaxRequestBufferSize = 300 * 1024 * 1024;
        serverOptions.Limits.MinRequestBodyDataRate = null;
        serverOptions.Limits.MinResponseDataRate = null;
    });
    builder.Services.Configure<FormOptions>(options =>
    {
        options.MultipartBodyLengthLimit = 300 * 1024 * 1024;
        options.ValueLengthLimit = 300 * 1024 * 1024;
        options.MemoryBufferThreshold = 300 * 1024 * 1024;
    });
    builder.Services.Configure<KestrelServerOptions>(options =>
    {
        options.Limits.MaxRequestBodySize = 300 * 1024 * 1024;
    });
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("EspressoDB"),
            b => b.MigrationsAssembly("RepainterAPI")
        )
    );
    builder.Services.AddDbContext<RepainterContext>(opts =>
        opts.UseSqlServer(
            builder.Configuration.GetConnectionString("EspressoDB"),
            b => b.MigrationsAssembly("RepainterAPI")
        )
    );
    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = true;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JWT:ValidAudience"],
            ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("UI", policyBuilder =>
        {
            var corsOriginAllowed = builder.Configuration["CorsOriginAllowed"];
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
    builder.Services.AddDistributedMemoryCache();
    builder.Services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = builder.Configuration["Redis:Configuration"];
        options.InstanceName = builder.Configuration["Redis:InstanceName"];
    });
    builder.Services.AddMediatR(cfg => {
        cfg.RegisterServicesFromAssemblies(
            typeof(GetEnquiryHandler).Assembly,
            typeof(GetInternalPaintingByCustomerIdHandler).Assembly,
            typeof(GetCurtainByCustomerId).Assembly
        );
    });
    builder.Services.AddAutoMapper(typeof(EnquiryModel).Assembly, typeof(EnquiryMappingProfile).Assembly);
    RegisterServices(builder.Services);
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
    services.AddScoped<ICurtainDataService, CurtainDataService>();
    services.AddScoped<ICurtainDataRepository, CurtainDataRepository>();
    services.AddScoped<WhatsAppService>();
    services.AddScoped<IEmailService, EmailService>();
    services.AddHttpClient<WhatsAppService>();
    services.AddLogging();
}
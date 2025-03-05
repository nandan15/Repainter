using DataCore;
using DataCore.Identity;
using DataModels.Enquiry;
using DataServices.Authentication;
using DataServices.CatalogService;
using DataServices.Customer;
using DataServices.Door_Grills.Queries;
using DataServices.Enquiry.Queries;
using DataServices.IEmailService;
using DataServices.Mappings;
using DataServices.Repository;
using DataServices.Repository.Curtain;
using DataServices.Repository.CustomerRepository;
using DataServices.Repository.Door_Grills;
using DataServices.Repository.FileUploadStorage;
using DataServices.Repository.Furniture;
using DataServices.Repository.InternalPainting;
using DataServices.Repository.Package;
using DataServices.Repository.TexturePainting;
using DataServices.Repository.WallPaneling;
using DataServices.Repository.Wallpaper;
using DataServices.WhatsApp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RepainterAPI.Filters;
using Shared.Contexts.Base;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Configure Services
ConfigureServices(builder);

var app = builder.Build();

// Configure Middleware
ConfigureMiddleware(app);

// Configure Upload Directories
ConfigureUploadDirectories(app);

app.Run();

void ConfigureServices(WebApplicationBuilder builder)
{
    // Increase request body size limits
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

    builder.Services.AddDbContext<ApplicationDbContext>(options =>
     options.UseSqlServer(
         configuration.GetConnectionString("EspressoDB"),
         sqlServerOptions =>
         {
             sqlServerOptions.EnableRetryOnFailure(
                 maxRetryCount: 5,
                 maxRetryDelay: TimeSpan.FromSeconds(30),
                 errorNumbersToAdd: null);
             sqlServerOptions.CommandTimeout(180);
             sqlServerOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
         }
     )
 );

    builder.Services.AddDbContext<RepainterContext>(options =>
        options.UseSqlServer(
            configuration.GetConnectionString("EspressoDB"),
            sqlServerOptionsAction: sqlOptions =>
            {
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
                sqlOptions.CommandTimeout(180);
            }
        )
    );

    // Identity Configuration
    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
    {
        // Password requirements
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequiredLength = 8;

        // Lockout settings
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;
    })
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
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidAudience = configuration["JWT:ValidAudience"],
            ValidIssuer = configuration["JWT:ValidIssuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"])),
            ClockSkew = TimeSpan.Zero
        };
    });

    // CORS Configuration
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("UI", policyBuilder =>
        {
            var corsOriginAllowed = configuration["CorsOriginAllowed"];
            if (!string.IsNullOrEmpty(corsOriginAllowed))
            {
                policyBuilder.WithOrigins(corsOriginAllowed.Split(','))
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }
            else
            {
                policyBuilder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }
        });
    });

    // Redis Caching
    builder.Services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = configuration["Redis:Configuration"];
        options.InstanceName = configuration["Redis:InstanceName"];
    });

    // MediatR Configuration
    builder.Services.AddMediatR(cfg =>
    {
        cfg.RegisterServicesFromAssemblies(
            typeof(GetEnquiryHandler).Assembly,
            // Add other handler assemblies as needed
            typeof(GetDoor_GrillByCustomerId).Assembly
        );
    });

    // AutoMapper
    builder.Services.AddAutoMapper(
        typeof(EnquiryModel).Assembly,
        typeof(EnquiryMappingProfile).Assembly
    );

    // Register Custom Services
    RegisterServices(builder.Services);

    // Swagger Configuration
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Repainter API", Version = "v1" });
        c.EnableAnnotations();
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "JWT Authorization header using the Bearer scheme."
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
        c.OperationFilter<AuthorizationHeaderParameterOperationFilter>();
    });

    // Add Controllers
    builder.Services.AddControllers();
}

void ConfigureMiddleware(WebApplication app)
{
    // Development Environment Specific Configuration
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Repainter API V1");
        });
        app.UseDeveloperExceptionPage();
    }

    // HTTPS Redirection
    app.UseHttpsRedirection();

    // Static Files Configuration
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

    // Middleware Order is Important
    app.UseCors("UI");
    app.UseAuthentication();
    app.UseAuthorization();

    // Map Controllers
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
    // Scoped Services Registration
    services.AddScoped<ICustomerRepository, CustomerRepository>();
    services.AddScoped<ICustomerService, CustomerService>();
    services.AddScoped<IUnitOfWork, RepainterUnitOfWork>();
    services.AddScoped<ICurrentUser, CurrentUser>();

    // Repository Services
    services.AddScoped<IInternalPaintingRepository, InternalPaintingRepository>();
    services.AddScoped<ITexturePaintingRepository, TexturePaintingRepository>();
    services.AddScoped<IPanelingRepository, WallPanelingRepository>();
    services.AddScoped<ICurtainRepository, CurtainRepository>();
    services.AddScoped<IFurnitureRepository, FurnitureRepository>();
    services.AddScoped<IDoor_GrillRepository, Door_GrillsRepository>();
    services.AddScoped<IWallpaperRepository, WallpaperRepository>();
    services.AddScoped<IPackageRepository, PackageRepository>();

    // Other Services
    services.AddScoped<IFileStorageService, FileStorageService>();
    services.AddScoped<ICatalogService, CatalogService>();
    services.AddScoped<WhatsAppService>();
    services.AddScoped<IEmailService, EmailService>();

    // HTTP Client
    services.AddHttpClient<WhatsAppService>();

    // Logging
    services.AddLogging();
}
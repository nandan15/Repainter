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
    // Form options configuration
    builder.Services.Configure<FormOptions>(options =>
    {
        options.MultipartBodyLengthLimit = 100 * 1024 * 1024;
    });

    // Kestrel configuration
    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.Limits.MaxRequestBodySize = 100 * 1024 * 1024;
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

    builder.Services.AddAutoMapper(typeof(EnquiryModel).Assembly);

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

    // Static files configuration
    app.UseStaticFiles();
    app.UseStaticFiles(new StaticFileOptions
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
    });

    app.UseCors("UI");
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
}

void ConfigureUploadDirectories(WebApplication app)
{
    var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "upload");
    var floorPlanPath = Path.Combine(uploadPath, "floor");
    var sitePlanPath = Path.Combine(uploadPath, "site");

    foreach (var path in new[] { uploadPath, floorPlanPath, sitePlanPath })
    {
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
    }
}

void RegisterServices(IServiceCollection services)
{
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
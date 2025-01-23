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
var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
builder.Services.AddDbContext<ApplicationDbContext>(options =>options.UseSqlServer(configuration["ConnectionString:EspressoDB"], d => d.MigrationsAssembly("DataCore")));
builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
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
builder.Services.AddDbContext<RepainterContext>(opts =>opts.UseSqlServer(configuration["ConnectionString:EspressoDB"],d => d.MigrationsAssembly("DataCore")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("UI", builder =>builder.WithOrigins(configuration["CorsOriginAllowed"].Split(",")) .AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetEnquiryHandler).GetTypeInfo().Assembly));
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetInternalPaintingByCustomerIdHandler).Assembly));
builder.Services.AddAutoMapper(typeof(EnquiryModel).Assembly);
builder.Services.AddScoped<IUnitOfWork, RepainterUnitOfWork>();
builder.Services.AddScoped<ICurrentUser, Currentuser>();
builder.Services.AddScoped<IInternalPaintingRepository, InternalPaintingRepository>();
builder.Services.AddControllers();
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
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("UI");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
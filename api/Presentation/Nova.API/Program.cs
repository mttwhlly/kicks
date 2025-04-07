using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Nova.Application.Repository;
using Nova.Persistence.Dapper.Repository;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Load configuration settings from appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Retrieve the Key Vault URI and Managed Identity Client ID
var keyVaultUri = builder.Configuration["AppSettings:KeyVaultUri"];
var managedIdentityClientId = builder.Configuration["AppSettings:ManagedIdentityClientId"];

// Use Managed Identity for authentication
var credential = new ManagedIdentityCredential(managedIdentityClientId);

// Create a SecretClient to interact with Key Vault
var client = new SecretClient(new Uri(keyVaultUri), credential);

// Retrieve a secret (replace with your secret name)
var secret = client.GetSecret("ConnectionStrings--MSCRM-poc");

// Access the secret value
var secretValue = secret.Value;
Console.WriteLine($"Secret Read Successfully!");

var AllowSpecificOrigins = "_allowSpecificOrigins";

// Add services to the container.
// Read the allowed origins from appsettings.json
var allowedOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options => 
{
    options.AddPolicy(name: AllowSpecificOrigins,
    policy =>
    {
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDbConnection>((sp) => new SqlConnection(secretValue.Value));
builder.Services.AddScoped<IBaseRepository, NovaRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();
}
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(AllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();

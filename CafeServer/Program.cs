using CafeServer.Config;
using CafeServer.Data;
using CafeServer.Models;
using CafeServer.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder.WithOrigins("https://night-day-cafe-face.onrender.com")
                         .AllowAnyMethod()
                         .AllowAnyHeader());
});

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDB"));

builder.Services.AddSingleton<MongoDbContext>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoDbContext(Options.Create(settings));
});

// Register repositories
builder.Services.AddSingleton<MenuRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<BillingRepository>();
builder.Services.AddScoped<InventoryRepository>();

// Add controllers
builder.Services.AddControllers()
    .AddNewtonsoftJson(options => options.UseMemberCasing());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use CORS
app.UseCors("AllowFrontend");

// Load menu items from JSON into MongoDB
using (var scope = app.Services.CreateScope())
{
    var menuRepo = scope.ServiceProvider.GetRequiredService<MenuRepository>();
    await LoadMenuData(menuRepo);
}

app.UseAuthorization();
app.MapControllers();
app.Run();

// Method to load menu data from JSON file
static async Task LoadMenuData(MenuRepository menuRepo)
{
    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "menu.json");

    if (File.Exists(filePath))
    {
        var jsonData = await File.ReadAllTextAsync(filePath);
        var menuItems = Newtonsoft.Json.JsonConvert.DeserializeObject<List<MenuItem>>(jsonData);

        if (menuItems != null)
        {
            // Insert only if the collection is empty
            if (!await menuRepo.HasData())
            {
                await menuRepo.AddMultipleMenuItems(menuItems);
                Console.WriteLine("Menu items loaded from JSON file into MongoDB.");
            }
        }
    }
}
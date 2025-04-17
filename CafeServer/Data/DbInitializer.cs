using CafeServer.Models;
using MongoDB.Driver;
using System.Collections.Generic;

namespace CafeServer.Data
{
    public class DbInitializer
    {
        private readonly MongoDbContext _context;

        public DbInitializer(MongoDbContext context)
        {
            _context = context;
        }

        public void Initialize()
        {
            // Ensure Users collection exists
            if (_context.Users.CountDocuments(_ => true) == 0)
            {
                _context.Users.InsertMany(new List<User>
                {
                    new User { Name = "Admin", Email = "admin@cafe.com", PasswordHash = "hashedpassword" },
                    new User { Name = "John Doe", Email = "john@example.com", PasswordHash = "hashedpassword" }
                });
            }

            // Ensure MenuItems collection exists
            if (_context.MenuItems.CountDocuments(_ => true) == 0)
            {
                _context.MenuItems.InsertMany(new List<MenuItem>
                {
                    new MenuItem { Name = "Espresso", Price = 25, Category = "Beverage" },
                    new MenuItem { Name = "Cheeseburger", Price = 599, Category = "Food" }
                });
            }

            // Ensure Orders collection exists
            if (_context.Orders.CountDocuments(_ => true) == 0)
            {
                _context.Orders.InsertOne(new Order
                {
                    UserId = "650d3b0d9f5a8a3b2e8d7a1a", // Replace with a real UserId from the Users collection
                    Items = new List<OrderItem>
                    {
                        new OrderItem
                        {
                            MenuItemIds = new List<string>
        {
            "650d3b0d9f5a8a3b2e8d7a1b", // Replace with a real MenuItemId from the MenuItems collection
            "650d3b0d9f5a8a3b2e8d7a1c"
        },
                            TotalPrice = 8.49m // Correct decimal format
                        }
                    },
                    Status = OrderStatus.Pending // Use Enum instead of raw string
                });
            }

        }
    }
}

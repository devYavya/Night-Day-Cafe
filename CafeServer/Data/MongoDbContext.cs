using CafeServer.Config;
using CafeServer.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CafeServer.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
        public IMongoCollection<MenuItem> MenuItems => _database.GetCollection<MenuItem>("MenuItems");
        public IMongoCollection<Order> Orders => _database.GetCollection<Order>("Orders");

        public IMongoCollection<Admin> Admins => _database.GetCollection<Admin>("Admins");
    }
}

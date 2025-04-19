using CafeServer.Data;
using CafeServer.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CafeServer.Repositories
{
    public class MenuRepository
    {
        private readonly IMongoCollection<MenuItem> _menuItems;

        public MenuRepository(MongoDbContext dbContext)
        {
            _menuItems = dbContext.MenuItems;
        }

        public async Task<Dictionary<string, List<MenuItem>>> GetAllMenuItems()
        {
            var filter = Builders<MenuItem>.Filter.Empty;
            var allItems = await _menuItems.Find(filter).ToListAsync();
            var categorized = new Dictionary<string, List<MenuItem>>();
            foreach (var item in allItems)
            {
                if (string.IsNullOrEmpty(item.Category))
                    continue;

                if (!categorized.ContainsKey(item.Category))
                    categorized[item.Category] = new List<MenuItem>();

                categorized[item.Category].Add(item);
            }
            return categorized;
        }

        public async Task AddMenuItem(MenuItem item) => await _menuItems.InsertOneAsync(item);

        public async Task AddMultipleMenuItems(List<MenuItem> items) => await _menuItems.InsertManyAsync(items);

        public async Task<bool> HasData() => (await _menuItems.CountDocumentsAsync(item => true)) > 0;
    }
}
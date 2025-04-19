using CafeServer.Config;
using CafeServer.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CafeServer.Repositories
{
    public class InventoryRepository
    {
        private readonly IMongoCollection<InventoryItem> _inventoryCollection;

        public InventoryRepository(IOptions<MongoDbSettings> mongoDBSettings)
        {
            var client = new MongoClient(mongoDBSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _inventoryCollection = database.GetCollection<InventoryItem>("Inventory");
        }

        public async Task CreateAsync(InventoryItem item) =>
            await _inventoryCollection.InsertOneAsync(item);

        public async Task<List<InventoryItem>> GetAsync() =>
            await _inventoryCollection.Find(_ => true).ToListAsync();

        public async Task<InventoryItem> GetAsync(string id) =>
            await _inventoryCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(string id, InventoryItem item) =>
            await _inventoryCollection.ReplaceOneAsync(x => x.Id == id, item);

        public async Task RemoveAsync(string id) =>
            await _inventoryCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<List<InventoryItem>> GetLowStockItems() =>
            await _inventoryCollection.Find(x => x.Quantity < x.Threshold).ToListAsync();
    }
}

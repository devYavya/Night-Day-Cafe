using CafeServer.Config;
using CafeServer.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CafeServer.Repositories
{
    public class BillingRepository
    {
        private readonly IMongoCollection<Order> _billingCollection;

        public BillingRepository(IOptions<MongoDbSettings> mongoDBSettings)
        {
            var client = new MongoClient(mongoDBSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _billingCollection = database.GetCollection<Order>("Billings");
        }

        public async Task CreateAsync(Order billing) =>
            await _billingCollection.InsertOneAsync(billing);

        public async Task<List<Order>> GetAsync() =>
            await _billingCollection.Find(_ => true).ToListAsync();

        public async Task<Order> GetAsync(string id) =>
            await _billingCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task UpdateAsync(string id, Order billing) =>
            await _billingCollection.ReplaceOneAsync(x => x.Id == id, billing);
        public async Task RemoveAsync(string id) =>
            await _billingCollection.DeleteOneAsync(x => x.Id == id);
        public async Task<long> CountAsync() =>
            await _billingCollection.CountDocumentsAsync(_ => true);

        public async Task<long> CountAsync(FilterDefinition<Order> filter) =>
            await _billingCollection.CountDocumentsAsync(filter);

        public async Task<decimal> GetTotalRevenueAsync() =>
            (await _billingCollection.Aggregate()
                .Group(x => 1, g => new { Total = g.Sum(x => x.TotalAmount) })
                .FirstOrDefaultAsync())?.Total ?? 0;
    }
}

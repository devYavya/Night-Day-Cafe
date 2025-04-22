using CafeServer.Data;
using CafeServer.Models;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace CafeServer.Repositories
{
    public class AdminRepository
    {
        private readonly IMongoCollection<Admin> _admins;

        public AdminRepository(MongoDbContext dbContext)
        {
            _admins = dbContext.Admins;
        }

        public async Task<Admin> GetAdminByEmail(string email) =>
            await _admins.Find(a => a.Email == email).FirstOrDefaultAsync();

        public async Task AddAdmin(Admin admin) =>
            await _admins.InsertOneAsync(admin);
    }
}

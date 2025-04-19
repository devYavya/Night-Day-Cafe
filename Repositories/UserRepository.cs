using CafeServer.Data;
using CafeServer.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CafeServer.Repositories
{
    public class UserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(MongoDbContext dbContext)
        {
            _users = dbContext.Users;
        }

        public async Task<List<User>> GetAllUsers() => await _users.Find(user => true).ToListAsync();

        public async Task<User> GetUserByEmail(string email) => await _users.Find(u => u.Email == email).FirstOrDefaultAsync();

        public async Task AddUser(User user) => await _users.InsertOneAsync(user);
    }
}
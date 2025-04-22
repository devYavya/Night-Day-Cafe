using CafeServer.Models;
using CafeServer.Repositories;
using System.Threading.Tasks;

namespace CafeServer.Data
{
    public static class DbInitializer
    {
        public static async Task SeedAdmin(AdminRepository adminRepository)
        {
            var existingAdmin = await adminRepository.GetAdminByEmail("yavyasharma3@gmail.com");
            if (existingAdmin == null)
            {
                var admin = new Admin
                {
                    Name = "Night Day Admin-Test",
                    Email = "yavyasharma3@gmail.com",
                    PasswordHash = "nightday123" // Replace with actual hashed password
                };
                await adminRepository.AddAdmin(admin);
            }
        }
    }
}

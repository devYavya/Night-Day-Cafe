using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CafeServer.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ?Id { get; set; }

        [BsonRequired]
        public string ?Name { get; set; }

        [BsonRequired]
        public string ?Email { get; set; }

        [BsonRequired]
        public string ?PasswordHash { get; set; }

        public string Role { get; set; } = "Customer";
    }
}
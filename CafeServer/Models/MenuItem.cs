using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CafeServer.Models
{
    public class MenuItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; }
    }
}

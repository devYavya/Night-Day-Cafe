using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CafeServer.Models
{
    public class InventoryItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string? Name { get; set; }

        [BsonElement("category")]
        public string ?Category { get; set; }

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("unit")]
        public string? Unit { get; set; }

        [BsonElement("threshold")]
        public int Threshold { get; set; }

        [BsonElement("lastUpdated")]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
}

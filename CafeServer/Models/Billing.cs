using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CafeServer.Models
{
    public class Billing
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("orderId")]
        public string ?OrderId { get; set; }

        [BsonElement("totalAmount")]
        public decimal TotalAmount { get; set; }

        [BsonElement("paymentMethod")]
        public string ?PaymentMethod { get; set; }

        [BsonElement("paymentStatus")]
        public string ?PaymentStatus { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

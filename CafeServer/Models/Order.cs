using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace CafeServer.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }

        public List<OrderItem> Items { get; set; } = new();
        public decimal TotalAmount { get; set; }
        public string TableNumber { get; set; } = string.Empty;
        public string OrderType { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
    }

    public class OrderItem
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public List<string>? MenuItemIds { get; set; }
        public decimal TotalPrice { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; } = string.Empty;
    }

    public enum OrderStatus
    {
        Pending,    // Order placed
        Preparing,  // Being prepared
        Delivered   // Order delivered
    }
}

using CafeServer.Data;
using CafeServer.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Text.Json;

namespace CafeServer.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly MongoDbContext _context;

        public OrderController(MongoDbContext context)
        {
            _context = context;
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<Order>> PlaceOrder(Order order)
        {
            try
            {
                Console.WriteLine($"Received order: {JsonSerializer.Serialize(order)}");
                await _context.Orders.InsertOneAsync(order);
                return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, new { success = true, order });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing order: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _context.Orders.Find(_ => true).ToListAsync();
            return Ok(orders);
        }
    }
}

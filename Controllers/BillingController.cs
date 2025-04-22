using CafeServer.Models;
using CafeServer.Repositories;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace CafeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly BillingRepository _billingRepository;

        public BillingController(BillingRepository billingRepository)
        {
            _billingRepository = billingRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var billings = await _billingRepository.GetAsync();
            return Ok(billings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var billing = await _billingRepository.GetAsync(id);
            if (billing == null)
            {
                return NotFound();
            }
            return Ok(billing);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Order order)
        {
            await _billingRepository.CreateAsync(order);
            return CreatedAtAction(nameof(Get), new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, Order order)
        {
            var existingBilling = await _billingRepository.GetAsync(id);
            if (existingBilling == null)
            {
                return NotFound();
            }
            await _billingRepository.UpdateAsync(id, order);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var billing = await _billingRepository.GetAsync(id);
            if (billing == null)
            {
                return NotFound();
            }
            await _billingRepository.RemoveAsync(id);
            return NoContent();
        }
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateOrderStatus(string id, [FromBody] OrderStatusUpdateRequest request)
        {
            try
            {
                var order = await _billingRepository.GetAsync(id);
                if (order == null)
                {
                    return NotFound();
                }

                OrderStatus newStatus;
                if (!Enum.TryParse(request.Status.ToString(), out newStatus))
                {
                    return BadRequest(new { message = "Invalid status value" });
                }

                order.Status = newStatus;

                await _billingRepository.UpdateAsync(id, order);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating order status", error = ex.Message });
            }
        }

        public class OrderStatusUpdateRequest
        {
            public int Status { get; set; } 
        }


        [HttpGet("dashboard-stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            try
            {
                var totalOrders = await _billingRepository.CountAsync();

                var pendingOrders = await _billingRepository.CountAsync(
                    Builders<Order>.Filter.Eq(b => b.Status, OrderStatus.Pending)
                );

                // Get Total Revenue (assuming this method exists in the repository)
                var totalRevenue = await _billingRepository.GetTotalRevenueAsync();
                var totalCustomers = await _billingRepository.CountAsync();

                var stats = new
                {
                    totalOrders,
                    pendingOrders,
                    revenue = totalRevenue.ToString("C"), // Format revenue as currency
                    customers = totalCustomers
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching dashboard stats", error = ex.Message });
            }
        }
    }
}

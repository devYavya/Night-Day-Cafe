using CafeServer.Models;
using CafeServer.Repositories;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver; 

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
            return CreatedAtAction(nameof(Get), new { id = order.Id }, order); // Updated to use order
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, Order order) // Changed from Billing to Order
        {
            var existingBilling = await _billingRepository.GetAsync(id);
            if (existingBilling == null)
            {
                return NotFound();
            }
            await _billingRepository.UpdateAsync(id, order); // Updated to use order
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

        [HttpGet("dashboard-stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            try
            {
                var totalOrders = await _billingRepository.CountAsync();
                var pendingOrders = await _billingRepository.CountAsync(Builders<Order>.Filter.Eq(b => b.Status, OrderStatus.Pending)); // Updated to use Order
                var totalRevenue = await _billingRepository.GetTotalRevenueAsync();
                var totalCustomers = 87;
                var stats = new
                {
                    totalOrders,
                    pendingOrders,
                    revenue = totalRevenue.ToString("C"),
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

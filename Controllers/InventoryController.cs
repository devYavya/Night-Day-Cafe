using CafeServer.Models;
using CafeServer.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CafeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryRepository _inventoryRepository;

        public InventoryController(InventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var items = await _inventoryRepository.GetAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var item = await _inventoryRepository.GetAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("low-stock")]
        public async Task<IActionResult> GetLowStock()
        {
            var items = await _inventoryRepository.GetLowStockItems();
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> Post(InventoryItem item)
        {
            await _inventoryRepository.CreateAsync(item);
            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, InventoryItem item)
        {
            var existingItem = await _inventoryRepository.GetAsync(id);
            if (existingItem == null)
            {
                return NotFound();
            }
            await _inventoryRepository.UpdateAsync(id, item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await _inventoryRepository.GetAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            await _inventoryRepository.RemoveAsync(id);
            return NoContent();
        }
    }
}

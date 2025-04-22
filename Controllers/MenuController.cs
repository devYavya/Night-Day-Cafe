using CafeServer.Models;
using CafeServer.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CafeServer.Controllers
{
    [Route("api/menu")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly MenuRepository _menuRepository;

        public MenuController(MenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetMenu()
        {
            try
            {
                var categorizedMenu = await _menuRepository.GetAllMenuItems();
                var categories = string.Join(", ", categorizedMenu.Keys);
                System.Console.WriteLine($"Categories returned by API: {categories}");

                return Ok(categorizedMenu);
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                System.Console.WriteLine($"Error retrieving menu: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while retrieving the menu." });
            }
        }

        [HttpPost]
        public async Task<ActionResult<MenuItem>> AddMenuItem(MenuItem item)
        {
            await _menuRepository.AddMenuItem(item);
            return CreatedAtAction(nameof(GetMenu), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMenuItem(string id, MenuItem updatedItem)
        {
            try
            {
                await _menuRepository.UpdateMenuItem(id, updatedItem);
                return NoContent();
            }
            catch (Exception ex)
            {
                System.Console.WriteLine($"Error updating menu item: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while updating the menu item." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(string id)
        {
            try
            {
                await _menuRepository.DeleteMenuItem(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                System.Console.WriteLine($"Error deleting menu item: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while deleting the menu item." });
            }
        }

        [HttpGet("raw")]
        public async Task<IActionResult> GetRawMenuItems()
        {
            var menuItems = await _menuRepository.GetAllMenuItems();
            return Ok(menuItems);
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> AddMenuItemsBulk([FromBody] List<MenuItem> items)
        {
            await _menuRepository.AddMultipleMenuItems(items);
            return Ok(new { Message = $"{items.Count} items added successfully." });
        }
    }
}
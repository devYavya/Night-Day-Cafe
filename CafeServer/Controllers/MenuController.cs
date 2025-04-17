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
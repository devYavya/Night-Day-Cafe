using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using CafeServer.Models;
using CafeServer.Repositories;

namespace CafeServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AdminRepository _adminRepository;
        private static ConcurrentDictionary<string, string> otpStore = new ConcurrentDictionary<string, string>();

        public AuthController(AdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }
        [HttpPost("request-otp")]
        public async Task<IActionResult> RequestOtp([FromBody] OtpRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Email is required.");
            }

            var admin = await _adminRepository.GetAdminByEmail(request.Email);
            if (admin == null)
            {
                return Unauthorized("Protected page: only admin access allowed.");
                
            }
            var otp = new Random().Next(100000, 999999).ToString();
            otpStore.AddOrUpdate(request.Email, otp, (key, oldValue) => otp);

            // For demo/testing, return OTP in response (in real app, send via email/SMS)
            return Ok(new { otp });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Otp))
            {
                return BadRequest("Email and OTP are required.");
            }

            var admin = await _adminRepository.GetAdminByEmail(request.Email);
            if (admin == null)
            {
                return Unauthorized("Protected page: only admin access allowed.");
            }

            if (otpStore.TryGetValue(request.Email, out var storedOtp))
            {
                if (storedOtp == request.Otp)
                {
                    otpStore.TryRemove(request.Email, out _);
                    return Ok(new { message = "Login successful", admin = new { admin.Id, admin.Name, admin.Email } });
                }
                else
                {
                    return Unauthorized("Invalid OTP.");
                }
            }
            else
            {
                return Unauthorized("OTP expired or not requested.");
            }
        }
    }

    public class OtpRequest
    {
        public required string Email { get; set; }
    }

    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Otp { get; set; }
    }
}

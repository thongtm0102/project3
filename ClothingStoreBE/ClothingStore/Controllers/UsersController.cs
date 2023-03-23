using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothingStore.Data;
using ClothingStore.Models;
using Azure.Identity;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace ClothingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public UsersController(ClothingStoreContext context)
        {
            _context = context;
        }

        public static string HashPassword(string password)
        {
            using (var sha = SHA512.Create())
            {
                var hashedBytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
                var hash = BitConverter.ToString(hashedBytes).Replace("-", "");
                return hash;
            }
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.Id)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("SignUp")]
        public async Task<ActionResult<Users>> PostUsers(Users user) // Đăng kí user mới
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'ClothingStoreContext.Users'  is null.");
            }
            int totalElements = _context.Users.Count();
            var newUser = new Users
            {
                //Id = totalElements + 1,
                userName = user.userName,
                password = HashPassword(user.password),
                phoneNumber = user.phoneNumber,
                role = 1,
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetUsers", new { id = newUser.Id }, newUser);
        }

        //POST: api/Users/Login
        [HttpPost("Login")]
        public Users Login(string userName, string password)
        {
            var passwordHased = HashPassword(password);
            var user = _context.Users.FirstOrDefault(u => u.userName == userName);
            if (user != null && user.password == passwordHased)
            {
                return user;
            }
            else
            {
                var userNull = new Users();
                return userNull;
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

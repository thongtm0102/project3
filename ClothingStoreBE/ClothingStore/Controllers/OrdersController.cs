using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothingStore.Data;
using ClothingStore.Models;

namespace ClothingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public OrdersController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            List<Order> orders = await _context.Order.ToListAsync();


            if (_context.Order == null)
            {
                return NotFound();
            }
            return await _context.Order.ToListAsync();
        }

        // GET: api/Orders
        [HttpGet("getFullOrders")]
        public async Task<ActionResult<IEnumerable<OrderGetFull>>> GetFullOrder()
        {
            try
            {
                List<Order> orders = await _context.Order.ToListAsync();
                //List<Products> products = await _context.Products.ToListAsync();
                List<OrderGetFull> orderGetFulls = new List<OrderGetFull>();
                foreach (var order in orders)
                {
                    OrderGetFull orderGetFull = new OrderGetFull();
                    orderGetFull.Id = order.Id;
                    orderGetFull.userFullName = order.userFullName;
                    orderGetFull.address = order.address;
                    orderGetFull.phoneNumber = order.phoneNumber;
                    orderGetFull.date = order.date;
                    orderGetFull.totalPrice = order.totalPrice;
                    var orderItems = await _context.OrderItems.FromSqlRaw("SELECT * FROM OrderItems Where OrderItems.orderId = {0}", order.Id).ToListAsync();
                    Console.WriteLine(orderItems);
                    List<OrderDetail> listProductQuantity = new List<OrderDetail>();
                    foreach (var orderItem in orderItems)
                    {
                        OrderDetail orderDetail = new OrderDetail();
                        orderDetail.Id = orderItem.Id;
                        orderDetail.quantity = orderItem.quantity;
                        var product = await _context.Products.FindAsync(orderItem.productId);
                        orderDetail.productTitle = product.title;
                        orderDetail.imgUrl = product.imgUrl;
                        orderDetail.price = product.price;
                        listProductQuantity.Add(orderDetail);
                        //orderGetFull.orderDetails.Add(orderDetail);
                    }
                    orderGetFull.orderDetails = listProductQuantity;
                    orderGetFulls.Add(orderGetFull);
                }
                return Ok(orderGetFulls);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
            var order = await _context.Order.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*[HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.orderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderAPIForm>> PostOrder(OrderAPIForm orderAPIForm)
        {
            if (_context.Order == null)
            {
                return Problem("Entity set 'ClothingStoreContext.Order'  is null.");
            }
            Order order = new Order
            {
                Id = orderAPIForm.Id,
                userFullName = orderAPIForm.userFullName,
                address = orderAPIForm.address,
                phoneNumber = orderAPIForm.phoneNumber,
                date = orderAPIForm.date,
                totalPrice = orderAPIForm.totalPrice,
            };

            var entry = _context.Order.Add(order);
            await _context.SaveChangesAsync();
            // Get id have recently added
            var orderId = (int)entry.Property("Id").CurrentValue;
            Console.WriteLine("orderId: " + orderId);


            /*var created = CreatedAtAction("GetOrder", new { id = orderAPIForm.Id }, orderAPIForm);
            Console.WriteLine(created);*/
            var products = orderAPIForm.products;
            foreach (var item in products)
            {
                OrderItems newOrderItems = new OrderItems
                {
                    orderId = orderId,
                    productId = item.productId,
                    quantity = item.quantity,
                };
                _context.OrderItems.Add(newOrderItems);
                await _context.SaveChangesAsync();
            }
            return CreatedAtAction("GetOrder", new { id = orderAPIForm.Id }, orderAPIForm);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Order == null)
            {
                return NotFound();
            }
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

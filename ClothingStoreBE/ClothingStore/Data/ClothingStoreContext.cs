using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ClothingStore.Models;

namespace ClothingStore.Data
{
    public class ClothingStoreContext : DbContext
    {
        public ClothingStoreContext (DbContextOptions<ClothingStoreContext> options)
            : base(options)
        {
        }

        public DbSet<ClothingStore.Models.Users> Users { get; set; } = default!;

        public DbSet<ClothingStore.Models.Products> Products { get; set; } = default!;

        public DbSet<ClothingStore.Models.Order> Order { get; set; } = default!;
        public DbSet<ClothingStore.Models.OrderItems> OrderItems { get; set; }
    }
}

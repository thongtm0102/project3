using System.ComponentModel.DataAnnotations;

namespace ClothingStore.Models
{
    public class Users
    {
        [Key]
        public int? Id { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string? phoneNumber { get; set; }
        public int role { get; set; }
    }
}

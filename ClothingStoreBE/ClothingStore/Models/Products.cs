using System.Reflection;

namespace ClothingStore.Models
{
    public class Products
    {
        public int? Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string imgUrl { get; set; }
        public int price { get; set; }
    }
}

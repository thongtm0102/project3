namespace ClothingStore.Models
{
    public class OrderItems
    {
        public int? Id { get; set; }
        public int orderId { get; set; }
        public int productId { get; set; }
        public int quantity { get; set; }
    }
}

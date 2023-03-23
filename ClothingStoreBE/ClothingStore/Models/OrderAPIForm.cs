namespace ClothingStore.Models
{
    public class OrderAPIForm
    {
        public int? Id { get; set; }
        public string userFullName { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }

        public DateTime? date = DateTime.Now;
        public int totalPrice { get; set; }
        public List<ProductAndQuantity> products { get; set; }
    }
    public class ProductAndQuantity
    {
        public int productId { get; set; }
        public int quantity { get; set; }
    }
}

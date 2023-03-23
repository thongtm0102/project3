namespace ClothingStore.Models
{
    public class Order
    {
        public int? Id { get; set; }
        public string userFullName { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public DateTime? date { get; set; }
        public int totalPrice { get; set; }
    }
}

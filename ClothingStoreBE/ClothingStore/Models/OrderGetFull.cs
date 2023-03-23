namespace ClothingStore.Models
{
    public class OrderGetFull
    {
        public int? Id { get; set; }
        public string userFullName { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public DateTime? date { get; set; }
        public int totalPrice { get; set; }
        public List<OrderDetail>? orderDetails { get; set; }
    }
    public class OrderDetail
    {
        public int? Id { get; set; }
        public string productTitle { get; set; }
        public string imgUrl { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }
    }
}

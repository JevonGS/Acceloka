namespace Acceloka.API.Features.BookingTickets
{
    public class TicketDetail
    {
        public string TicketCode { get; set; } = string.Empty;
        public string TicketName { get; set; } = string.Empty;
        public int Price { get; set; }
    }
    public class CategorySum
    {
        public string CategoryName { get; set; } = string.Empty;

        public int SummaryPrice { get; set; }

        public List<TicketDetail> Tickets { get; set; } = new();
    }
    public class BookingTickets_Response_
    {

        public int PriceSummary { get; set; }

        public List<CategorySum> TicketsPerCategories { get; set; } = new();
    }

}

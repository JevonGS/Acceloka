namespace Acceloka.API.Features.GetBookedItems
{

    public class BookedTickets
    {
        public string TicketCode { get; set; } = string.Empty;
        public string TicketName { get; set; } = string.Empty;
        public string EventDate { get; set; } = string.Empty;
    }
        public class GetBookedItems_Response_
    {
        public int QtyPerCategory { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public List<BookedTickets> tickets { get; set; } = new();
    }
}

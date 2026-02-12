namespace Acceloka.API.Features.GetBookedItems
{

    public class BookedTickets
    {
        public string TicketCode { get; set; }
        public string TicketName { get; set; }
        public string EventDate { get; set; }
    }
        public class GetBookedItems_Response_
    {
        public int QtyPerCategory { get; set; }
        public string CategoryName { get; set; }
        public List<BookedTickets> tickets { get; set; } = new();
    }
}

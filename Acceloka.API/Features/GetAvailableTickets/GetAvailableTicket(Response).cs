public class GetAvailableTickets_Response_
{
    public List<TicketsModel> Tickets { get; set; } = new();
    public int TotalTickets { get; set; }
}

public class TicketsModel
{
    public string TicketCode { get; set; } = string.Empty;
    public string TicketName { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;
    public int Price { get; set; }
    public DateTime EventDate { get; set; }
    public int Quota { get; set; }
}
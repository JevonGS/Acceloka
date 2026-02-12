namespace Acceloka.API.Features.EditTicketQty
{
    public class EditTicketQty_Response_
    {
        public string TicketCode { get; set; } = string.Empty;
        public string TicketName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
}

using MediatR;

namespace Acceloka.API.Features.EditTicketQty
{
    public class Items
    {
        public string TicketCode { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
    public class EditTicketQty_Request_ : IRequest<IResult>
    {
        public string BookedTicketId { get; set; } = string.Empty;
        public List<Items> EditTicketQuantity { get; set; } = new();
    }
}

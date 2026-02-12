using MediatR;

namespace Acceloka.API.Features.BookingTickets
{
    public class BookingTickets_Request_ : IRequest<IResult>
    {
        public List<ItemRequest> BookingItems { get; set; } = new();
    }
    public class ItemRequest
    {
        public string TicketCode { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}

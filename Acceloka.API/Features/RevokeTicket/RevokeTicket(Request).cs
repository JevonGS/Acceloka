using MediatR;

namespace Acceloka.API.Features.RevokeTicket
{
    public class RevokeTicket_Request_ : IRequest<IResult>
    {
        public string BookedTicketId { get; set; } = string.Empty;
        public string TicketCode { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}

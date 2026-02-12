using MediatR;

namespace Acceloka.API.Features.GetBookedItems
{
    public class GetBookedItems_Request_ : IRequest<IResult>
    {
        public string BookedTicketId { get; set; }
    }
}

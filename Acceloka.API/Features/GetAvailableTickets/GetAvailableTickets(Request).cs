using MediatR;

namespace Acceloka.API.Features.GetAvailableTickets
{
    public class GetAvailableTickets_Request_ : IRequest<IResult>
    {
        public string? CategoryName { get; set; }
        public string? TicketCode { get; set; }
        public string? TicketName { get; set; }
        public int? Price { get; set; }
        public DateTime? MinEventDate { get; set; }
        public DateTime? MaxEventDate { get; set; }
        public string OrderBy { get; set; } = "TicketCode";
        public string OrderState { get; set; } = "asc";
        public int PageNumber { get; set; } = 1;
    }
}

using Acceloka.API.Features.BookingTickets;
using Acceloka.API.Features.EditTicketQty;
using Acceloka.API.Features.GetAvailableTickets;
using Acceloka.API.Features.GetBookedItems;
using Acceloka.API.Features.RevokeTicket;
using MediatR;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Acceloka.API.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TicketsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/<TicketsController>
        [HttpGet("get-available-ticket")]
        public async Task<IResult> GetAvailableTicket([FromQuery] GetAvailableTickets_Request_ request)
        {
            return await _mediator.Send(request);
        }

        // POST api/<TicketsController>
        [HttpPost("book-ticket")]
        public async Task<IResult> BookTicket([FromBody] BookingTickets_Request_ request)
        {
            return await _mediator.Send(request);
        }

        [HttpGet("get-booked-ticket/{BookedTicketId}")]
        public async Task<IResult> GetBookedTicket([FromRoute] string BookedTicketId)
        {
            var result = await _mediator.Send(new GetBookedItems_Request_ { BookedTicketId = BookedTicketId });
            return result;
        }

        // DELETE api/<TicketsController>/5
        [HttpDelete("revoke-ticket/{BookedTicketId}/{TicketCode}/{Qty}")]
        public async Task<IResult> RevokeTicket([FromRoute] string BookedTicketId, [FromRoute] string TicketCode, [FromRoute] int Qty)
        {
            return await _mediator.Send(new RevokeTicket_Request_
            {
                BookedTicketId = BookedTicketId,
                TicketCode = TicketCode,
                Quantity = Qty
            });
        }

        [HttpPut("edit-booked-ticket/{BookedTicketId}")]
        public async Task<IResult> EditQuantity([FromRoute] string BookedTicketId, [FromBody] List<Items> items)
        {
            return await _mediator.Send(new EditTicketQty_Request_
            {
                BookedTicketId = BookedTicketId,
                EditTicketQuantity = items
            });
        }
   
    }

}

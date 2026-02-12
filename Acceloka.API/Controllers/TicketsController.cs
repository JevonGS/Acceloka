using Acceloka.API.Features.BookingTickets;
using Acceloka.API.Features.GetAvailableTickets;
using Acceloka.API.Features.GetBookedItems;
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
        public async Task<IActionResult> GetAvailableTicket([FromQuery] GetAvailableTickets_Request_ request)
        {
            var result = await _mediator.Send(request);

            return Ok(result);
        }

        // POST api/<TicketsController>
        [HttpPost("book-ticket")]
        public async Task<IActionResult> BookTicket([FromBody] BookingTickets_Request_ request)
        {
            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("get-booked-ticket/{BookedTicketId}")]
        public async Task<IActionResult> GetBookedTicket(string BookedTicketId)
        {
            var result = await _mediator.Send(new GetBookedItems_Request_ { BookedTicketId = BookedTicketId });
            return Ok(result);
        }

        // PUT api/<TicketsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TicketsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

using AccelokaAPI.Entities.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.API.Features.RevokeTicket
{
    public class RevokeTicket_Handler_ : IRequestHandler<RevokeTicket_Request_, IResult>
    {
        private readonly AccelokaContext _db;
        public RevokeTicket_Handler_(AccelokaContext db)
        {
            _db = db;
        }
        public async Task<IResult> Handle(RevokeTicket_Request_ request, CancellationToken cancellationToken)
        {
            var booking = await _db.BookedTicketDbs
                .FirstOrDefaultAsync(x => x.BookedTicketId == request.BookedTicketId, cancellationToken);
            
            if (booking == null)
            {
                return Results.NotFound(new { detail = "Booked ticket ID not found." });
            }

            var bookedItem = await _db.BookedTicketDbs
                .Include(x => x.TicketCodeNavigation)
                .FirstOrDefaultAsync(x => x.BookedTicketId == request.BookedTicketId 
                                    && x.TicketCode == request.TicketCode, cancellationToken);

            if (bookedItem == null)
            {
                return Results.BadRequest(new { detail = "Ticket code not found." });
            }
            if (request.Quantity > bookedItem.Quantity)
            {
                return Results.BadRequest(new { detail = "Quantity cannot exceed the quantity ordered." });
            }
            var ticket = await _db.TicketDbs
                .FirstOrDefaultAsync(x => x.TicketCode == request.TicketCode, cancellationToken);

            if (ticket != null)
            {
                ticket.Quota += request.Quantity;
            }

            bookedItem.Quantity -= request.Quantity;

            if (bookedItem.Quantity == 0)
            {
                _db.BookedTicketDbs.Remove(bookedItem);
            }

            await _db.SaveChangesAsync(cancellationToken);
            var result = await _db.BookedTicketDbs
                .Include(x => x.TicketCodeNavigation)
                .Where(x => x.BookedTicketId == request.BookedTicketId)
                .Select(z => new RevokeTicket_Response_
                {
                    TicketCode = z.TicketCode,
                    TicketName = z.TicketCodeNavigation.TicketName,
                    Quantity = z.Quantity,
                    CategoryName = z.TicketCodeNavigation.CategoryName
                })
                .ToListAsync(cancellationToken);
            return Results.Ok(result);
        }
    }
}

using AccelokaAPI.Entities.Context;
using AccelokaAPI.Entities.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.API.Features.BookingTickets
{
    public class BookingTickets_Handler_ : IRequestHandler<BookingTickets_Request_, IResult>
    {
        private readonly AccelokaContext _db;
        public BookingTickets_Handler_(AccelokaContext db)
        {
            _db = db;
        }
        public async Task<IResult> Handle(BookingTickets_Request_ request, CancellationToken cancellationToken)
        {
            var today = DateTime.UtcNow;
            var bookedTicketId = Guid.NewGuid().ToString();

            var inputCodes = request.BookingItems.Select(x => x.TicketCode).ToList();
            var dbTickets = await _db.TicketDbs
                .Where(x => inputCodes.Contains(x.TicketCode))
                .ToListAsync(cancellationToken);

            foreach (var item in request.BookingItems)
            {
                var ticket = dbTickets.FirstOrDefault(x => x.TicketCode == item.TicketCode);

                if (ticket == null)
                {
                    return Results.Problem(
                        detail: $"Ticket code {item.TicketCode} not registered.", 
                        statusCode: 400,
                        title: "Bad Request"
                        );
                }

                if (ticket.Quota <= 0)
                {
                    return Results.Problem(
                        detail: "Ticket is sold out.", 
                        statusCode: 400,
                        title: "Bad Request"
                        );
                }

                if (item.Quantity > ticket.Quota)
                {
                    return Results.Problem(
                        detail: "Quantity exceeds remaining quota.", 
                        statusCode: 400,
                        title: "Bad Request"
                        );
                }

                if (ticket.EventDate <= today)
                {
                    return Results.Problem(
                        detail: "Ticket for the event date booked cannot be <= the ticket booking date.", 
                        statusCode: 400,
                        title:"Bad Request"
                        );
                }
            }

            var bookedList = new List<BookedTicketDB>();

            var groupedItems = request.BookingItems
            .GroupBy(x => x.TicketCode).Select(g => new { 
                TicketCode = g.Key, 
                TotalQuantity = g.Sum(x => x.Quantity)
            });

            foreach (var group in groupedItems)
            {
                var ticket = dbTickets.First(x => x.TicketCode == group.TicketCode);

                bookedList.Add(new BookedTicketDB
                {
                    BookedTicketId = bookedTicketId,
                    TicketCode = group.TicketCode,
                    Quantity = group.TotalQuantity,
                    BookedEventDate = today
                });

                ticket.Quota -= group.TotalQuantity;
            }

            _db.BookedTicketDbs.AddRange(bookedList);
            await _db.SaveChangesAsync(cancellationToken);

            var categoryGroups = dbTickets.Join(request.BookingItems,
                x => x.TicketCode,
                y => y.TicketCode,
                (x, y) => new { x.CategoryName, x.TicketCode, x.TicketName, x.Price, y.Quantity })
                .GroupBy(z => z.CategoryName)
                .Select(a => new CategorySum{
                    CategoryName = a.Key,
                    SummaryPrice = a.Sum(z => z.Price * z.Quantity),
                    Tickets = a.Select(z => new TicketDetail
                    {
                        TicketCode = z.TicketCode,
                        TicketName = z.TicketName,
                        Price = z.Price
                    }).ToList()
                }).ToList();

            var response = new BookingTickets_Response_
            {
                PriceSummary = categoryGroups.Sum(x => x.SummaryPrice),
                TicketsPerCategories = categoryGroups   
            };

            return Results.Ok(response);
        }

    }
}

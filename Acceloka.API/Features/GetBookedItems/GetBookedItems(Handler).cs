using AccelokaAPI.Entities.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.API.Features.GetBookedItems
{
    public class GetBookedItems_Handler_ : IRequestHandler<GetBookedItems_Request_, IResult>
    {

        private readonly AccelokaContext _db;
        public GetBookedItems_Handler_(AccelokaContext db)
        {
            _db = db;
        }

        public async Task<IResult> Handle(GetBookedItems_Request_ request, CancellationToken cancellationToken)
        {

            var bookedData = await _db.BookedTicketDbs
                .Include(x => x.TicketCodeNavigation)
                .Where(x => x.BookedTicketId == request.BookedTicketId)
                .ToListAsync(cancellationToken);

            if (bookedData == null || !bookedData.Any())
            {
                return Results.Problem(
                    detail: "BookedTicketId not registered.",
                    statusCode: 400,
                    title: "Bad Request"
                );
            }

            var response = bookedData
                .GroupBy(x => x.TicketCodeNavigation.CategoryName)
                .Select(y => new GetBookedItems_Response_
                {
                    CategoryName = y.Key,
                    QtyPerCategory = y.Sum(x => x.Quantity),
                    tickets = y.Select(z => new BookedTickets
                    {
                        TicketCode = z.TicketCode,
                        TicketName = z.TicketCodeNavigation.TicketName,
                        EventDate = z.TicketCodeNavigation.EventDate,
                        Quantity = z.Quantity
                    }).ToList()
                }).ToList();

            return Results.Ok(response);
        }
    }
}

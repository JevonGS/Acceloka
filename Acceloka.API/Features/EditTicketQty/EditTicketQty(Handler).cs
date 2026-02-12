using AccelokaAPI.Entities.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.API.Features.EditTicketQty
{
    public class EditTicketQty_Handler_ : IRequestHandler<EditTicketQty_Request_, IResult>
    {
        private readonly AccelokaContext _db;
        public EditTicketQty_Handler_(AccelokaContext db)
        {
            _db = db;
        }
        public async Task<IResult> Handle(EditTicketQty_Request_ request, CancellationToken cancellationToken) 
        {
            var group = await _db.BookedTicketDbs
                .Where(x => x.BookedTicketId == request.BookedTicketId)
                .ToListAsync(cancellationToken);

            if (!group.Any())
            {
                return Results.Problem(
                    detail: "Ticked Id not registered.",
                    statusCode: 400,
                    title: "Bad Request");
            }

            foreach (var item in request.EditTicketQuantity)
            {
                var current = group.FirstOrDefault(x => x.TicketCode == item.TicketCode);
                if (current == null)
                {
                    return Results.Problem(
                        detail: $"Tciket code {item.TicketCode} not registered in this ID.",
                        statusCode: 400,
                        title: "Bad Request");
                }

                var current1 = await _db.TicketDbs.FirstOrDefaultAsync(x => x.TicketCode == item.TicketCode, cancellationToken);

                int diff = item.Quantity - current.Quantity;

                if (diff > 0 && current1!.Quota < diff)
                {
                    return Results.Problem(
                        detail: "Quantity exceed remaining quota.",
                        statusCode: 400,
                        title: "Bad Request");
                }

                if (current1 != null)
                {
                    current1.Quota -= diff;
                }
                current.Quantity = item.Quantity;
            }

            await _db.SaveChangesAsync(cancellationToken);

            var result = await _db.BookedTicketDbs
                .Include(x => x.TicketCodeNavigation)
                .Where(x => x.BookedTicketId == request.BookedTicketId)
                .Select(z => new EditTicketQty_Response_
                {
                    TicketCode = z.TicketCode,
                    TicketName = z.TicketCodeNavigation.TicketName,
                    Quantity = z.Quantity,
                    CategoryName = z.TicketCodeNavigation.CategoryName
                }).ToListAsync(cancellationToken);

            return Results.Ok(result);
        }
    }
}

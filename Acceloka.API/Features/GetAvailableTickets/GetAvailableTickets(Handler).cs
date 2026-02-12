using Acceloka.API.Features.GetAvailableTickets;
using AccelokaAPI.Entities.Context;
using AccelokaAPI.Entities.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.API.Features.Tickets.GetAvailableTickets
{
    public class GetAvailableTickets_Handler_ : IRequestHandler<GetAvailableTickets_Request_, IResult>
    {
        private readonly AccelokaContext _db;

        public GetAvailableTickets_Handler_(AccelokaContext db)
        {
            _db = db;
        }

        public async Task<IResult> Handle(GetAvailableTickets_Request_ request, CancellationToken cancellationToken)
        {
            var queries = _db.TicketDbs.Where(x => x.Quota > 0).AsQueryable();

            if (!string.IsNullOrEmpty(request.CategoryName))
            {
                queries = queries.Where(x => x.CategoryName.Contains(request.CategoryName));
            }

            if (!string.IsNullOrEmpty(request.TicketCode))
            {
                queries = queries.Where(x => x.TicketCode.Contains(request.TicketCode));
            }

            if (!string.IsNullOrEmpty(request.TicketName))
            {
                queries = queries.Where(x => x.TicketName.Contains(request.TicketName));
            }

            if (request.Price.HasValue)
            {
                queries = queries.Where(x => x.Price <= request.Price.Value);
            }

            if (request.MinEventDate.HasValue)
            {
                queries = queries.Where(x => x.EventDate >= request.MinEventDate.Value);
            }

            if (request.MaxEventDate.HasValue)
            {
                queries = queries.Where(x => x.EventDate <= request.MaxEventDate.Value);
            }

            IOrderedQueryable<TicketDB> orderedQueries;

            string orderBy = string.IsNullOrEmpty(request.OrderBy) ? "TicketCode" : request.OrderBy;
            bool isDescending = request.OrderState?.ToLower() == "desc";

            if (isDescending)
            {
                orderedQueries = orderBy switch
                {
                    "TicketName" => queries.OrderByDescending(x => x.TicketName),
                    "CategoryName" => queries.OrderByDescending(x => x.CategoryName),
                    "Price" => queries.OrderByDescending(x => x.Price),
                    "EventDate" => queries.OrderByDescending(x => x.EventDate),
                    _ => queries.OrderByDescending(x => x.TicketCode)
                };
            }
            else
            {
                orderedQueries = orderBy switch
                {
                    "TicketName" => queries.OrderBy(x => x.TicketName),
                    "CategoryName" => queries.OrderBy(x => x.CategoryName),
                    "Price" => queries.OrderBy(x => x.Price),
                    "EventDate" => queries.OrderBy(x => x.EventDate),
                    _ => queries.OrderBy(x => x.TicketCode)
                };
            }

            var queriesFinal = orderedQueries.ThenByDescending(x => x.EventDate).ThenBy(x => x.Price);
            int totalCount = await queriesFinal.CountAsync(cancellationToken);
            int number = 10;
            int pagitation = (request.PageNumber - 1) * number;

            var result = await queriesFinal.Skip(pagitation).Take(number).Select(x => new TicketsModel
            {
                CategoryName = x.CategoryName,
                TicketCode = x.TicketCode,
                TicketName = x.TicketName,
                EventDate = x.EventDate,
                Price = x.Price,
                Quota = x.Quota
            }).ToListAsync(cancellationToken);

            var response = new GetAvailableTickets_Response_
            {
                Tickets = result,
                TotalTickets = totalCount
            };

            return Results.Ok(response);
        }
    }
}
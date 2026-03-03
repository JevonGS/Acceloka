using FluentValidation;

namespace Acceloka.API.Features.GetAvailableTickets
{
    public class GetAvailableTickets_Validator_ : AbstractValidator<GetAvailableTickets_Request_>
    {
        public GetAvailableTickets_Validator_()
        {
            var allowedCategories = new List<string> { "cinema", "concert", "transportasi darat", "transportasi laut", "transportasi udara", "hotel" };
            RuleFor(x => x.CategoryName)
            .Must(x => allowedCategories.Contains(x.ToLower()))
            .WithMessage("Category not valid. (Cinema, Concert, Transportasi Darat, Transportasi Laut, Transportasi Udara, Hotel.")
            .When(x => !string.IsNullOrEmpty(x.CategoryName));

            RuleFor(x => x.TicketCode)
                .MinimumLength(5).WithMessage("Ticket code min 5 characters.")
                .When(x => !string.IsNullOrEmpty(x.TicketCode));

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0).WithMessage("Price cannot be negative.")
                .When(x => x.Price.HasValue);

            RuleFor(x => x.MinEventDate)
                .LessThanOrEqualTo(x => x.MaxEventDate)
                .WithMessage("Minimal event date must less or equal than max event date.")
                .When(x => x.MinEventDate.HasValue && x.MaxEventDate.HasValue);
            RuleFor(x => x.OrderBy)
                .Must(x => string.IsNullOrEmpty(x) || 
                    new[] { "TicketName", "CategoryName", "Price", "EventDate", "TicketCode" }.Contains(x))
                .WithMessage("OrderBy not valid.");

            RuleFor(x => x.OrderState)
                .Must(x => x.ToLower() == "asc" || x.ToLower() == "desc")
                .WithMessage("OrderState asc or desc.")
                .When(x => !string.IsNullOrEmpty(x.OrderState));
            RuleFor(x => x.PageNumber)
                .GreaterThan(0).WithMessage("Page must greater than 0.");
        }
    }
}

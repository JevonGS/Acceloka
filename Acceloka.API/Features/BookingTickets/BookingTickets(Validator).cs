using FluentValidation;

namespace Acceloka.API.Features.BookingTickets
{
    public class BookingTickets_Validator_ : AbstractValidator<BookingTickets_Request_>
    {
        public BookingTickets_Validator_()
        {
            RuleFor(x => x.BookingItems).NotNull().WithMessage("Items cannot be null.")
                .NotEmpty().WithMessage("Items not found.");
            RuleForEach(x => x.BookingItems).ChildRules(y =>
            {
                y.RuleFor(z => z.TicketCode).NotEmpty().WithMessage("Code not valid.");
                y.RuleFor(z => z.Quantity).GreaterThan(0).WithMessage("Quantity must greater than 0.");
            });
        }
    }
}

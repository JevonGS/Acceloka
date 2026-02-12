using FluentValidation;

namespace Acceloka.API.Features.RevokeTicket
{
    public class RevokeTicket_Validator_ : AbstractValidator<RevokeTicket_Request_>
    {
        public RevokeTicket_Validator_()
        {
            RuleFor(x => x.BookedTicketId)
                .NotEmpty().WithMessage("BookedTicketId cannot be empty.");
            RuleFor(x => x.TicketCode)
                .NotEmpty().WithMessage("Ticket code cannot be empty.");
            RuleFor(x => x.Quantity)
                .GreaterThan(0).WithMessage("Quantity must greater than 0.");
        }
    }
}

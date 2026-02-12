using FluentValidation;

namespace Acceloka.API.Features.EditTicketQty
{
    public class EditTicketQty_Validator_ : AbstractValidator<EditTicketQty_Request_>
    {
        public EditTicketQty_Validator_()
        {
            RuleFor(x => x.BookedTicketId)
                .NotEmpty().WithMessage("BookedTicketId cannot be empty.");

            RuleFor(x => x.EditTicketQuantity)
                .NotEmpty().WithMessage("Item not found.");

            RuleForEach(x => x.EditTicketQuantity).ChildRules(item =>
            {
                item.RuleFor(x => x.TicketCode)
                    .NotEmpty().WithMessage("Ticket code cannot be empty.");
                item.RuleFor(x => x.Quantity)
                    .GreaterThan(0).WithMessage("Quantity must greater than 0.");
            });
        }
    }
}

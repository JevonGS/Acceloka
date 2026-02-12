using Acceloka.API.Features.GetBookedItems;
using FluentValidation;

public class GetBookedTicketValidator : AbstractValidator<GetBookedItems_Request_>
{
    public GetBookedTicketValidator()
    {
        RuleFor(x => x.BookedTicketId)
            .NotEmpty().WithMessage("BookedTicketId cannot be empty.");
    }
}
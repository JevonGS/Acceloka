using FluentValidation;
using MediatR;

namespace Acceloka.API.Common
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TRequest>(request);

                var validationResults = await Task.WhenAll(_validators.Select(x => x.ValidateAsync(context, cancellationToken)));
                var failures = validationResults.SelectMany(x => x.Errors).Where(y => y != null).ToList();

                if (failures.Count != 0)
                {
                    var errorDetails = failures.Select(x => x.ErrorMessage).ToList();

                    var problem = Results.Problem(
                        detail: string.Join(" , ", errorDetails),
                        statusCode: 400,
                        title: "Validation Error"
                    );

                    return (TResponse)(object)problem;
                }
            }

            return await next();
        }
    }
}



namespace AccelokaAPI.Entities.Model;

public partial class BookedTicketDB
{
    public string BookedTicketId { get; set; } = null!;

    public string TicketCode { get; set; } = null!;

    public int Quantity { get; set; }

    public DateTime BookedEventDate { get; set; }

    public virtual TicketDB TicketCodeNavigation { get; set; } = null!;
}

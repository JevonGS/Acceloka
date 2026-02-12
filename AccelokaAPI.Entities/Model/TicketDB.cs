using System.ComponentModel.DataAnnotations.Schema;

namespace AccelokaAPI.Entities.Model;

[Table("TicketDB")]
public partial class TicketDB
{
    public string TicketCode { get; set; } = null!;

    public string TicketName { get; set; } = null!;

    public string CategoryName { get; set; } = null!;

    public int Price { get; set; }

    public DateTime EventDate { get; set; }

    public int Quota { get; set; }
}

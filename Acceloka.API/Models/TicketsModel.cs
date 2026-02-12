
namespace Acceloka.API.Models
{
    public class TicketsModel
    {
        public DateTime EventDate { get; set; }
        public string TicketCode { get; set; } = string.Empty;
        public string TicketName { get; set; } = string.Empty;
        public int Quota { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public int Price { get; set; }
    }
}
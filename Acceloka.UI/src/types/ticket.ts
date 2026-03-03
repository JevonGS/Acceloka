export interface Ticket {
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  price: number;
  eventDate: string;
  quota: number;
}

export interface GetAvailableTicketsResponse {
  tickets: Ticket[];
  totalPages: number;
  totalTickets: number;
}


export interface ItemRequest {
  ticketCode: string;
  quantity: number;
}

export interface BookingTicketsRequest {
  bookingItems: ItemRequest[];
}


export interface TicketDetail {
  ticketCode: string;
  ticketName: string;
  price: number;
}

export interface CategorySum {
  categoryName: string;
  summaryPrice: number;
  tickets: TicketDetail[];
}

export interface BookingTicketsResponse {
  priceSummary: number;
  ticketsPerCategories: CategorySum[];
}

export interface BookedTicketItem {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
  quantity: number;
}

export interface GetBookedItemsResponse {
  categoryName: string;
  qtyPerCategory: number;
  tickets: BookedTicketItem[];
}

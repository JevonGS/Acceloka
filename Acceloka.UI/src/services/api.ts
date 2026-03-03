import { GetAvailableTicketsResponse } from "@/types/ticket";
import { BookingTicketsRequest } from "@/types/ticket";
import { GetBookedItemsResponse } from "@/types/ticket";

const BASE_URL = "https://localhost:7254/api/v1";

export async function fetchAvailableTickets(filters: any): Promise<GetAvailableTicketsResponse> {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/get-available-ticket?${query}`);

  const rawText = await res.text();

  if (res.ok) {
    const data = JSON.parse(rawText);
    return data.value !== undefined ? data.value : data;
  } else {
    let cleanMessage = rawText;

    if (rawText.includes('"detail":')) {
      const part = rawText.split('"detail":"')[1];
      if (part) cleanMessage = part.split('"')[0];
    }
    throw { detail: cleanMessage.trim() };
  }
}

export async function bookTickets(request: BookingTicketsRequest) {
  const res = await fetch(`${BASE_URL}/book-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const rawText = await res.text();

  if (res.ok) {
    const data = JSON.parse(rawText);
    return data.value !== undefined ? data.value : data;
  } else {
    let cleanMessage = rawText;
    if (rawText.includes('"detail":')) {
      const part = rawText.split('"detail":"')[1];
      if (part) cleanMessage = part.split('"')[0];
    }
    throw { detail: cleanMessage.trim() };
  }
}

export async function fetchBookedTicketDetail(bookedTicketId: string): Promise<GetBookedItemsResponse[]> {
  const res = await fetch(`${BASE_URL}/get-booked-ticket/${bookedTicketId}`);
  
  const rawText = await res.text();

  if (res.ok) {
    return JSON.parse(rawText);
  } else {
    let cleanMessage = rawText;
    if (rawText.includes('"detail":')) {
      const part = rawText.split('"detail":"')[1];
      if (part) cleanMessage = part.split('"')[0];
    }
    throw { detail: cleanMessage.trim() };
  }
}

export async function revokeTicket(bookedTicketId: string, ticketCode: string, qty: number) {
  const res = await fetch(`${BASE_URL}/revoke-ticket/${bookedTicketId}/${ticketCode}/${qty}`, {
    method: "DELETE",
  });

  const rawText = await res.text();

  if (res.ok) {
    const data = JSON.parse(rawText);
    return data.value !== undefined ? data.value : data;
  } else {
    let cleanMessage = rawText;
    if (rawText.includes('"detail":')) {
      const part = rawText.split('"detail":"')[1];
      if (part) cleanMessage = part.split('"')[0];
    }
    throw { detail: cleanMessage.trim() || "Error." };
  }
}

export async function editBookedTicket(bookedTicketId: string, itemsPayload: any) {
  const res = await fetch(`${BASE_URL}/edit-booked-ticket/${bookedTicketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemsPayload),
  });

  const rawText = await res.text();

  if (res.ok) {
    const data = JSON.parse(rawText);
    return data.value !== undefined ? data.value : data;
  } else {
    let cleanMessage = rawText;
    if (rawText.includes('"detail":')) {
      const part = rawText.split('"detail":"')[1];
      if (part) cleanMessage = part.split('"')[0];
    }
    throw { detail: cleanMessage.trim() || "Error." };
  }
}
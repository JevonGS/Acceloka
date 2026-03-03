"use client";
import { useState } from "react";
import { fetchAvailableTickets } from "@/services/api";
import { Ticket } from "@/types/ticket";
import { bookTickets } from "@/services/api";
import TicketFilters from "./Filter";
import TicketTable from "./Table";

export default function ViewAvailableBooking() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    CategoryName: "",
    TicketCode: "",
    TicketName: "",
    Price: "",
    MinEventDate: "",
    MaxEventDate: "",
    OrderBy: "TicketCode",
    OrderState: "asc",
    PageNumber: 1,
  });

  const [inputTicket, setInputTicket] = useState({
    TicketCode: "",
    Quantity: 1,
  });
  const [bookingList, setBookingList] = useState<any[]>([]);

  const loadData = async (p: number = filters.PageNumber) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchAvailableTickets({ ...filters, PageNumber: p });
      setTickets(data?.tickets || []);
      setHasSearched(true);
    } catch (err: any) {
      setErrorMessage(err.detail || "Error");
      setTickets([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="sticky top-18 -mx-6 border-b -mt-8 mb-10 z-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-8">
          <TicketFilters
            filters={filters}
            setFilters={setFilters}
            onSearch={() => {
              setFilters({ ...filters, PageNumber: 1 });
              loadData(1);
            }}
            loading={loading}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">Error:</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <TicketTable
        tickets={tickets}
        hasSearched={hasSearched}
        errorMessage={errorMessage}
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        loadData={loadData}
      />
    </main>
  );
}

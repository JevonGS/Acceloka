"use client";
import { useState } from "react";
import {
  fetchBookedTicketDetail,
  revokeTicket,
  editBookedTicket,
} from "@/services/api";
import { GetBookedItemsResponse } from "@/types/ticket";
import SearchForm from "./Search";
import BookingDetails from "./Table";
import ActionForm from "./Action";

export default function ViewBookingPage() {
  const [bookedTicketId, setBookedTicketId] = useState("");
  const [bookedData, setBookedData] = useState<GetBookedItemsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSearch = async (showSuccess = false) => {
    if (!bookedTicketId.trim()) {
      setErrorMessage("Booked Ticket ID cannot be empty.");
      setBookedData([]);
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    setActionError(null);
    if (!showSuccess) setSuccessMessage(null);

    try {
      const data = await fetchBookedTicketDetail(bookedTicketId);
      if (data && Array.isArray(data) && data.length > 0) {
        setBookedData(data);
      } else {
        setErrorMessage("Booking data not found.");
        setBookedData([]);
      }
    } catch (err: any) {
      const message = err?.detail || "Error.";
      setErrorMessage(message);
      setBookedData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (ticketCode: string, qty: number) => {
    if (!ticketCode) {
      setActionError("Code not found.");
      setSuccessMessage(null);
      return;
    }
    setLoading(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      await revokeTicket(bookedTicketId, ticketCode, qty);
      setSuccessMessage("Success to revoke ticket!");
      await handleSearch(true);
    } catch (err: any) {
      setActionError(err.detail || "Error.");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (ticketCode: string, newQty: number) => {
    if (!ticketCode) {
      setActionError("Code not found.");
      setSuccessMessage(null);
      return;
    }
    setLoading(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      const itemsPayload = [{ ticketCode: ticketCode, quantity: newQty }];
      await editBookedTicket(bookedTicketId, itemsPayload);
      setSuccessMessage("Quantity updated!");
      await handleSearch(true);
    } catch (err: any) {
      setActionError(err.detail || "Error.");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className=" min-h-screen text-black">
      <div className="sticky top-18 -mx-6 border-b -mt-8 mb-10 z-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-7">
          <SearchForm
            bookedTicketId={bookedTicketId}
            setBookedTicketId={setBookedTicketId}
            onSearch={() => handleSearch(false)}
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

      <BookingDetails bookedData={bookedData} />

      <div className="mt-8">
        {actionError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl">
            <p className="font-bold">Error:</p>
            <p className="text-sm">{actionError}</p>
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-xl">
            <p className="font-bold">Action:</p>
            <p className="text-sm">{successMessage}</p>
          </div>
        )}
      </div>

      {bookedData.length > 0 && (
        <ActionForm
          onRevoke={handleRevoke}
          onEdit={handleEdit}
          loading={loading}
          bookedData={bookedData}
          setActionError={setActionError}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </main>
  );
}

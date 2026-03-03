"use client";
import { GetBookedItemsResponse } from "@/types/ticket";

interface BookingDetailsProps {
  bookedData: GetBookedItemsResponse[];
}

export default function BookingDetails({ bookedData }: BookingDetailsProps) {
  if (!bookedData || !Array.isArray(bookedData) || bookedData.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 text-xs">
      {bookedData.map((category, index: number) => (
        <div
          key={index}
          className="bg-white rounded border overflow-hidden"
        >
          <div className="flex justify-between items-center p-4 bg-white">
            <h2 className="font-bold text-gray-800 uppercase tracking-wider">
              {category.categoryName}
            </h2>
            <span className="bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-sm">
              Total Ticket: {category.qtyPerCategory}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left table-fixed">
              <thead className="bg-[#2d2d2d] text-white">
                <tr>
                  <th className="p-3 w-1/4">Ticket Code</th>
                  <th className="p-3 w-2/4">Ticket Name</th>
                  <th className="p-3 w-1/4">Event Date</th>
                  <th className="p-3 w-16 text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                {category.tickets.map((ticket, tIndex: number) => (
                  <tr
                    key={tIndex}
                  >
                    <td className="p-3 font-medium text-gray-700">
                      {ticket.ticketCode}
                    </td>
                    <td className="p-3 font-medium">{ticket.ticketName}</td>
                    <td className="p-3 font-medium">
                      {ticket.eventDate.substring(0, 10)}
                    </td>
                    <td className="p-3 font-bold text-right text-gray-900">
                      {ticket.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

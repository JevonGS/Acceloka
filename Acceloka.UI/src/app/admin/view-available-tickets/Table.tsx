// src/app/components/TicketTable.tsx
"use client";

export default function TicketTable({
  tickets,
  hasSearched,
  errorMessage,
  loading,
  filters,
  setFilters,
  loadData,
}: any) {
  if (!hasSearched) return null;

  return (
    <div className="text-xs overflow-hidden border rounded mb-8">
      <table className="w-full text-left table-fixed">
        <thead className="bg-[#2d2d2d] text-white">
          <tr>
            <th className="p-3 w-1/6">Ticket Code</th>
            <th className="p-3 w-2/6">Ticket Name</th>
            <th className="p-3 w-1/6">Category</th>
            <th className="p-3 w-1/6">Price</th>
            <th className="p-3 w-1/6">Event Date</th>
            <th className="p-3 w-1/12 text-center">Quota</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((t: any) => (
              <tr
                key={t.ticketCode}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{t.ticketCode}</td>
                <td className="p-3 font-medium">{t.ticketName}</td>
                <td className="p-3 font-medium">{t.categoryName}</td>
                <td className="p-3 font-medium">Rp{t.price.toLocaleString()}</td>
                <td className="p-3 font-medium">
                  {new Date(t.eventDate) <= new Date() ? (
                    <span className="text-red-500 font-bold">
                      {t.eventDate.substring(0, 10)}
                    </span>
                  ) : (
                    t.eventDate.substring(0, 10)
                  )}
                </td>
                <td className="p-3 font-medium text-center">{t.quota}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-10 text-center text-gray-500 italic">
                Ticket not found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="p-4 flex justify-between items-center bg-gray-50 border-t">
        <button
          disabled={filters.PageNumber === 1 || loading}
          onClick={() => {
            const p = filters.PageNumber - 1;
            setFilters({ ...filters, PageNumber: p });
            loadData(p);
          }}
          className="px-4 py-2 border rounded bg-white font-semibold text-sm hover:bg-gray-100 disabled:opacity-30 transition"
        >
          Prev
        </button>
        <span className="font-bold text-sm text-gray-700">
          Page {filters.PageNumber}
        </span>
        <button
          disabled={tickets.length < 10 || loading}
          onClick={() => {
            const p = filters.PageNumber + 1;
            setFilters({ ...filters, PageNumber: p });
            loadData(p);
          }}
          className="px-4 py-2 border rounded bg-white font-semibold text-sm hover:bg-gray-100 disabled:opacity-30 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

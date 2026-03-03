"use client";

interface SearchFormProps {
  bookedTicketId: string;
  setBookedTicketId: (id: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchForm({
  bookedTicketId,
  setBookedTicketId,
  onSearch,
  loading,
}: SearchFormProps) {
  return (
    <div className="bg-white p-1 pt-3 rounded-2xl text-xs mb-3">
      <label className="text-gray-600">
        Enter Booked Ticket ID span (example:{" "}
        <span className="font-bold">94bf211e-aeb2-4415-b12e-fd67dcd72248</span>)
      </label>
      <div className="flex gap-4 pt-2">
        <input
          type="text"
          value={bookedTicketId}
          onChange={(e) => setBookedTicketId(e.target.value)}
          placeholder="Input here"
          className="flex-1 border p-1 rounded"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="bg-[#6c6c6c] text-white px-6 py-1 rounded font-bold hover:bg-[#2d2d2d] transition disabled:bg-gray-400"
        >
          {loading ? "..." : "Get Booked Ticket"}
        </button>
      </div>
    </div>
  );
}

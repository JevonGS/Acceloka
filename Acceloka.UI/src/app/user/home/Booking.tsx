import Link from "next/link";

export default function BookingForm({
  inputTicket,
  setInputTicket,
  onAdd,
  loading,
  errorMessage,
}: any) {
  return (
    <div className="relative bg-white p-5 py-3 md:p-8 rounded-xl shadow-2xl md:mx-40">

      <Link
        href="/user/view-tickets"
        className="group absolute -top-8 md:-top-5 left-1/2 -translate-x-1/2 bg-[#2d2d2d] px-5 py-1.5 rounded-full shadow-lg hover:bg-white cursor-pointer transition-all duration-300"
      >
        <h2 className="text-white text-xs py-2 px-4 md:text-sm font-bold whitespace-nowrap group-hover:text-[#2d2d2d]">
          Book your ticket Now!
        </h2>
      </Link>

      <div className="flex flex-col md:flex-row gap md:gap-4 items-end">
        <div className="w-full flex-1">
          <label className="text-[10px] uppercase ml-1">
            Ticket Code
          </label>
          <input
            placeholder="Ticket code"
            className="w-full border border-gray-500 p-3 rounded-sm text-xs focus:ring-1 focus:ring-[#3c2f01] outline-none"
            value={inputTicket.TicketCode}
            onChange={(e) =>
              setInputTicket({ ...inputTicket, TicketCode: e.target.value })
            }
          />
        </div>

        <div className="w-full md:w-24">
          <label className="text-[10px] ml-1">Quantity</label>
          <input
            type="number"
            className="w-full border border-gray-500 p-3 rounded-sm text-xs focus:ring-1 focus:ring-[#3c2f01] outline-none"
            value={inputTicket.Quantity}
            onChange={(e) =>
              setInputTicket({
                ...inputTicket,
                Quantity: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>

        <button
          onClick={onAdd}
          disabled={loading}
          className="w-full md:w-auto bg-[#3c2f01] text-white md:mb-0 md:mt-0 mt-3 mb-1 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-[#513f01] transition shadow-md active:scale-95 disabled:bg-gray-300"
        >
          {loading ? "..." : "ADD"}
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 mt-5 text-center text-sm">{errorMessage}</p>
      )}
    </div>
  );
}

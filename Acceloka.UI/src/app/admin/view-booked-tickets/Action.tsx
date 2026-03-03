"use client";
import { useState } from "react";

interface ActionFormProps {
  onRevoke: (ticketCode: string, qty: number) => Promise<void>;
  onEdit: (ticketCode: string, newQty: number) => Promise<void>;
  loading: boolean;
  bookedData: any[];
  setActionError: (message: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

export default function ActionForm({
  onRevoke,
  onEdit,
  loading,
  bookedData,
  setActionError,
  setSuccessMessage,
}: ActionFormProps) {
  const [activeTab, setActiveTab] = useState("edit");
  const [formData, setFormData] = useState({ ticketCode: "", qty: 1 });

  const availableTickets = bookedData.flatMap(
    (item) => item.Tickets || item.tickets || [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);

    if (!formData.ticketCode) {
      setActionError("Kode tiket harus dipilih!");
      setSuccessMessage(null);
      return;
    }

    if (formData.qty <= 0) {
      setActionError("Jumlah harus lebih besar dari 0!");
      setSuccessMessage(null);
      return;
    }

    if (activeTab === "edit") {
      await onEdit(formData.ticketCode, formData.qty);
    } else {
      await onRevoke(formData.ticketCode, formData.qty);
    }
  };

  return (
    <div
      className={`mt-8 p-4 border rounded text-xs transition-colors duration-300 ${
        activeTab === "edit" ? "bg-white" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex gap-4 mb-3 border-b pb-3">
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-1 rounded-lg font-bold ${
            activeTab === "edit" ? "bg-gray-200 border" : "hover:bg-gray-200"
          }`}
        >
          Update Quantity
        </button>
        <button
          onClick={() => setActiveTab("revoke")}
          className={`px-4 py-1 rounded-lg font-bold ${
            activeTab === "revoke"
              ? "bg-red-600 text-white border"
              : "bg-gray-100 text-red-600 hover:bg-gray-200"
          }`}
        >
          Delete Quantity
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-end"
      >
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">
            Ticket Code
          </label>
          <select
            className="w-full border p-3 rounded-xl mt-1 text-black bg-white"
            value={formData.ticketCode}
            onChange={(e) =>
              setFormData({ ...formData, ticketCode: e.target.value })
            }
          >
            <option value="">-- Choose Ticket --</option>
            {availableTickets.map((ticket, index) => {
              const code = ticket.ticketCode;
              const name = ticket.ticketName;
              return (
                <option key={index} value={code}>
                  {name} ({code})
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full md:w-32">
          <label
            className={`uppercase ml-1 ${
              activeTab === "edit" ? "text-gray-500" : "text-red-700"
            }`}
          >
            {activeTab === "edit" ? "Update Quantity" : "Delete Quantity"}
          </label>
          <input
            type="number"
            className={`w-full border p-3 rounded-xl mt-1 text-black bg-white ${
              activeTab === "revoke"
                ? "focus:ring-red-500 focus:border-red-500"
                : ""
            }`}
            value={formData.qty}
            onChange={(e) =>
              setFormData({ ...formData, qty: parseInt(e.target.value) || 0 })
            }
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-white transition ${
            activeTab === "edit"
              ? "bg-[#6c6c6c] hover:bg-[#2d2d2d]"
              : "bg-red-600 hover:bg-red-700"
          } disabled:bg-gray-400`}
        >
          {loading ? "..." : "Execute"}
        </button>
      </form>
    </div>
  );
}

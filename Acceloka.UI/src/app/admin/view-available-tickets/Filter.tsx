"use client";
import { useState } from "react";

export default function TicketFilters({
  filters,
  setFilters,
  onSearch,
  loading,
}: any) {
  const [activeFilter, setActiveFilter] = useState("TicketName");

  const handleFilterTypeChange = (newType: string) => {
    setActiveFilter(newType);

    setFilters({
      ...filters,
      TicketName: "",
      TicketCode: "",
      CategoryName: "",
      Price: "",
      MinEventDate: "",
      MaxEventDate: "",
    });
  };

  return (
    <div className="mb-3 text-xs">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-2 items-end">

          <div className="flex-1 w-full">
            <select
              className="w-full border p-1 rounded-xl bg-white outline-blue-500 text-black shadow-sm"
              value={activeFilter}
              onChange={(e) => handleFilterTypeChange(e.target.value)}
            >
              <option value="TicketName">Name</option>
              <option value="TicketCode">Code</option>
              <option value="CategoryName">Category</option>
              <option value="Price">Max. Price</option>
              <option value="EventDate">Date Range</option>
            </select>
          </div>

          <div className="flex-[2] w-full">
            {activeFilter === "TicketName" && (
              <input
                placeholder="Input here"
                className="w-full border p-1 rounded-xl outline-blue-500 text-black shadow-sm"
                value={filters.TicketName}
                onChange={(e) =>
                  setFilters({ ...filters, TicketName: e.target.value })
                }
              />
            )}
            {activeFilter === "TicketCode" && (
              <input
                placeholder="Input here"
                className="w-full border p-1 rounded-xl outline-blue-500 text-black shadow-sm"
                value={filters.TicketCode}
                onChange={(e) =>
                  setFilters({ ...filters, TicketCode: e.target.value })
                }
              />
            )}
            {activeFilter === "CategoryName" && (
              <input
                placeholder="Input here"
                className="w-full border p-1 rounded-xl outline-blue-500 text-black shadow-sm"
                value={filters.CategoryName}
                onChange={(e) =>
                  setFilters({ ...filters, CategoryName: e.target.value })
                }
              />
            )}
            {activeFilter === "Price" && (
              <input
                type="number"
                placeholder="Input here"
                className="w-full border p-1 rounded-xl outline-blue-500 text-black shadow-sm"
                value={filters.Price}
                onChange={(e) =>
                  setFilters({ ...filters, Price: e.target.value })
                }
              />
            )}
            {activeFilter === "EventDate" && (
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 border p-1 rounded-xl shadow-sm text-black"
                  value={filters.MinEventDate}
                  onChange={(e) =>
                    setFilters({ ...filters, MinEventDate: e.target.value })
                  }
                />
                <span className="self-center font-bold text-blue-800">-</span>
                <input
                  type="date"
                  className="flex-1 border p-1 rounded-xl shadow-sm text-black"
                  value={filters.MaxEventDate}
                  onChange={(e) =>
                    setFilters({ ...filters, MaxEventDate: e.target.value })
                  }
                />
              </div>
            )}
          </div>
          <div className="flex-1 w-full grid grid-cols-2 gap-2">
            <div>
              <label className="text-[8px] font-bold text-gray-400 uppercase ml-1">
                Order By
              </label>
              <select
                className="w-full border p-1 rounded-xl bg-white text-black shadow-sm"
                value={filters.OrderBy}
                onChange={(e) =>
                  setFilters({ ...filters, OrderBy: e.target.value })
                }
              >
                <option value="TicketCode">Code</option>
                <option value="TicketName">Name</option>
                <option value="Price">Price</option>
                <option value="EventDate">Date</option>
              </select>
            </div>
            <div>
              <label className="text-[8px] font-bold text-gray-400 uppercase ml-1">
                Order state
              </label>
              <select
                className="w-full border p-1 rounded-xl bg-white text-black shadow-sm"
                value={filters.OrderState}
                onChange={(e) =>
                  setFilters({ ...filters, OrderState: e.target.value })
                }
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-end pt-3">
          <button
            disabled={loading}
            onClick={onSearch}
            className="w-full bg-[#6c6c6c] text-white py-1 rounded font-bold hover:bg-[#2d2d2d] transition disabled:bg-gray-400 shadow-md"
          >
            {loading ? "..." : "Get Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}

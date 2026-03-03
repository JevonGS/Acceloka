"use client";
import { useEffect, useState } from "react";
import { fetchAvailableTickets } from "@/services/api";
import { Ticket, GetAvailableTicketsResponse } from "@/types/ticket";

export default function ViewTicketsPage() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [displayedTickets, setDisplayedTickets] = useState<Ticket[]>([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    code: "",
    price: "",
    minDate: "",
    maxDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const [totalPages, setTotalPages] = useState(1);
  const [totalFilteredItems, setTotalFilteredItems] = useState(0);

  const categories = [
    "Cinema",
    "Concert",
    "Hotel",
    "Transportasi Udara",
    "Transportasi Darat",
    "Transportasi Laut",
  ];

  const loadAllTickets = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      let allFetchedTickets: Ticket[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response: GetAvailableTicketsResponse =
          await fetchAvailableTickets({
            PageNumber: page,
          });

        if (response.tickets && response.tickets.length > 0) {
          allFetchedTickets = [...allFetchedTickets, ...response.tickets];

          if (response.tickets.length < 10) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }

        if (page > 50) hasMore = false;
      }

      setAllTickets(allFetchedTickets);
      applyFiltersAndPagination(
        allFetchedTickets,
        1,
        activeCategory,
        searchCriteria,
      );
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndPagination = (
    data: Ticket[],
    page: number,
    category: string | null,
    criteria: typeof searchCriteria,
  ) => {
    let filteredData = data.filter((ticket) => {
      const matchesCategory = category
        ? ticket.categoryName.toLowerCase() === category.toLowerCase()
        : true;

      const matchesName = criteria.name
        ? ticket.ticketName.toLowerCase().includes(criteria.name.toLowerCase())
        : true;

      const matchesCode = criteria.code
        ? ticket.ticketCode.toLowerCase().includes(criteria.code.toLowerCase())
        : true;

      const matchesPrice = criteria.price
        ? ticket.price <= Number(criteria.price)
        : true;

      const ticketDate = new Date(ticket.eventDate);
      const matchesMinDate = criteria.minDate
        ? ticketDate >= new Date(criteria.minDate)
        : true;
      const matchesMaxDate = criteria.maxDate
        ? ticketDate <= new Date(criteria.maxDate)
        : true;

      return (
        matchesCategory &&
        matchesName &&
        matchesCode &&
        matchesPrice &&
        matchesMinDate &&
        matchesMaxDate
      );
    });

    setTotalFilteredItems(filteredData.length);

    const newTotalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
    setTotalPages(newTotalPages);

    const validatedPage = Math.min(Math.max(1, page), newTotalPages);
    setCurrentPage(validatedPage);

    const startIndex = (validatedPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedTickets(filteredData.slice(startIndex, endIndex));
  };

  useEffect(() => {
    loadAllTickets();
  }, []);

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    applyFiltersAndPagination(allTickets, 1, category, searchCriteria);
  };

  const handleSearchChange = (key: string, value: string) => {
    const newCriteria = { ...searchCriteria, [key]: value };
    setSearchCriteria(newCriteria);
    applyFiltersAndPagination(allTickets, 1, activeCategory, newCriteria);
  };

  const handleAddToCart = (ticket: Ticket) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ticketDate = new Date(ticket.eventDate);
    ticketDate.setHours(0, 0, 0, 0);

    if (ticketDate < today) {
      setMessage({
        text: `Cannot add ${ticket.ticketName}, the event has already passed.`,
        type: "error",
      });
      return;
    }

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex(
      (item: any) => item.ticketCode === ticket.ticketCode,
    );

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({ ...ticket, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    setMessage({
      text: `${ticket.ticketName} added to cart!`,
      type: "success",
    });
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Explore Tickets</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <input
              type="text"
              placeholder="Search name"
              className="border p-2 rounded-lg text-sm"
              value={searchCriteria.name}
              onChange={(e) => handleSearchChange("name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Search code"
              className="border p-2 rounded-lg text-sm"
              value={searchCriteria.code}
              onChange={(e) => handleSearchChange("code", e.target.value)}
            />
            <input
              type="number"
              placeholder="Max price"
              className="border p-2 rounded-lg text-sm"
              value={searchCriteria.price}
              onChange={(e) => handleSearchChange("price", e.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="date"
                className="border p-2 rounded-lg text-xs w-1/2"
                value={searchCriteria.minDate}
                onChange={(e) => handleSearchChange("minDate", e.target.value)}
              />
              <input
                type="date"
                className="border p-2 rounded-lg text-xs w-1/2"
                value={searchCriteria.maxDate}
                onChange={(e) => handleSearchChange("maxDate", e.target.value)}
              />
            </div>
          </div>

          <label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-3">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === null
                  ? "bg-[#2d2d2d] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#2d2d2d] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-r-xl mb-6 text-sm font-semibold flex justify-between items-center ${
              message.type === "success"
                ? "bg-green-50 border-l-4 text-green-700 border border-green-500"
                : "bg-red-50 text-red-700 mb-6 p-4 border border-l-4 border-red-500"
            }`}
          >
            <span>{message.text}</span>
          </div>
        )}

        <p className="mb-2 text-sm text-gray-600">
          Total Found: {totalFilteredItems}
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading tickets...</p>
        ) : errorMessage ? (
          <p className="text-center text-red-500">{errorMessage}</p>
        ) : displayedTickets.length === 0 ? (
          <p className="text-center text-gray-500">No tickets found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTickets.map((ticket) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const ticketDate = new Date(ticket.eventDate);
              ticketDate.setHours(0, 0, 0, 0);
              const isExpired = ticketDate < today;

              return (
                <div
                  key={ticket.ticketCode}
                  className={`bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition ${
                    isExpired ? "opacity-60" : ""
                  }`}
                >
                  <h3 className="text-xl font-bold">{ticket.ticketName}</h3>
                  <p className="text-gray-500 text-sm">{ticket.categoryName}</p>
                  <div className="flex justify-between">
                    <p className="text-2xl font-bold text-yellow-600 mt-3">
                      Rp{ticket.price.toLocaleString()}
                    </p>
                    <h4 className="mt-5 text-sm font-bold text-gray-600">
                      Event Date:
                    </h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Quota: {ticket.quota}
                    </p>
                    <p className="font-semibold text-sm">
                      {ticket.eventDate.substring(0, 10)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(ticket)}
                    disabled={isExpired}
                    className={`mt-4 w-full py-2 rounded-lg font-semibold transition ${
                      isExpired
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-700"
                    }`}
                  >
                    {isExpired ? "Expired" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            disabled={currentPage === 1 || loading}
            onClick={() =>
              applyFiltersAndPagination(
                allTickets,
                currentPage - 1,
                activeCategory,
                searchCriteria,
              )
            }
            className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
          >
            Prev
          </button>
          <span className="font-semibold text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages || loading}
            onClick={() =>
              applyFiltersAndPagination(
                allTickets,
                currentPage + 1,
                activeCategory,
                searchCriteria,
              )
            }
            className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

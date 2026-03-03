"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAvailableTickets } from "@/services/api";
import BookingForm from "./Booking";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [inputTicket, setInputTicket] = useState({
    TicketCode: "",
    Quantity: 1,
  });

  const addToCart = async () => {
    setErrorMessage(null);
    const code = inputTicket.TicketCode.trim();
    const quantity = inputTicket.Quantity;

    if (!code) {
      setErrorMessage("Ticket code cannot be empty.");
      return;
    }
    if (quantity <= 0) {
      setErrorMessage("Ticket quantity must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchAvailableTickets({ ticketCode: code });
      const foundTicket = response.tickets && response.tickets[0];

      if (!foundTicket || foundTicket.ticketCode !== code) {
        setErrorMessage(`Ticket code "${code}" not found.`);
        setLoading(false);
        return;
      }

      const now = new Date();
      const eventDate = new Date(foundTicket.eventDate);
      if (eventDate < now) {
        setErrorMessage("This ticket has expired.");
        setLoading(false);
        return;
      }

      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = currentCart.findIndex(
        (item: any) => item.ticketCode === code,
      );

      let updatedCart;
      if (existingItemIndex > -1) {
        updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += quantity;
        if (updatedCart[existingItemIndex].quantity > foundTicket.quota) {
          setErrorMessage(
            `Total quantity exceeds quota (Quota: ${foundTicket.quota}).`,
          );
          setLoading(false);
          return;
        }
      } else {
        if (quantity > foundTicket.quota) {
          setErrorMessage(
            `Quantity exceeds quota (Quota: ${foundTicket.quota}).`,
          );
          setLoading(false);
          return;
        }
        updatedCart = [
          ...currentCart,
          {
            ticketCode: code,
            quantity: quantity,
            ticketName: foundTicket.ticketName,
            price: foundTicket.price,
          },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      router.push("/user/view-cart");
    } catch (err: any) {
      setErrorMessage(err.detail || "Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden">

      <div className="relative w-full h-screen overflow-hidden md:rounded-b-2xl shadow-xl">
        <img
          src="/home-banner.jpg"
          alt="Acceloka Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-5 flex flex-col items-center md:justify-center text-center p-6 z-10">
          <h1 className="text-5xl md:text-9xl font-extrabold text-white shadow-text">
            Acceloka
          </h1>
          <div className="mt-4 bg-[#2d2d2d]/80 p-2 rounded-xl max-w-[95%]">
            <p className="text-white text-xs md:text-lg font-semibold">
              Efficient ticket booking system for your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="relative -mt-120 md:mt-12 px-2 w-full">
        <BookingForm
          inputTicket={inputTicket}
          setInputTicket={setInputTicket}
          onAdd={addToCart}
          loading={loading}
          errorMessage={errorMessage}
        />
      </div>

      <div className="max-w-full md:mt-0 mt-2 md:mx-45 py-6 md:py-16 md:pb-5 relative md:static">
        <div className="grid grid-cols-1 md:grid-cols-2 mx-10">
          <h2 className="text-3xl md:text-left text-center font-bold md:text-black text-white mb-5">
            Promotions
          </h2>
          <p className="text-blue-400 hidden text-right md:block text-sm mr-5 mt-5 cursor-pointer">
            view all
          </p>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 md:gap-8 md:mx-10 mx-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-300 bg-white p-1 rounded-2xl border shadow-sm text-center hover:scale-110 hover:border-blue-100 ${i >= 3 ? "hidden lg:block" : ""}`}
            >
              <img
                src="/promos.avif"
                alt="Promotion"
                className="rounded-xl w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-full md:mt-0 mt-20 md:mx-45 py-6 md:py-12 relative md:static">
        <div className="grid grid-cols-1 md:grid-cols-2 mx-10">
          <h2 className="text-xl lg:text-3xl md:text-left text-center font-bold text-black mb-5">
            Top Categories
          </h2>
          <p className="text-blue-400 hidden text-right md:block text-sm mr-5 lg:mt-5 mt-2 cursor-pointer">
            view all
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mx-10">
          {[
            { img: "/plane.png", title: "Transportasi Udara" },
            { img: "/bus.avif", title: "Transportasi Darat" },
            { img: "/ship.webp", title: "Transportasi Laut" },
          ].map((item, i) => (
            <div
              key={i}
              className="group hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white overflow-hidden rounded-2xl border shadow-sm text-center h-40 md:h-48 flex items-center justify-center group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300">
                <img
                  src={item.img}
                  alt={item.title}
                  className="max-h-full w-full object-contain p-4"
                />
              </div>
              <p className="text-center mt-3 text-sm font-semibold group-hover:text-blue-600">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-full md:mt-0 mt-5 md:mx-45 py-6 md:py-12 md:pt-2 relative md:static">
        <div className="grid grid-cols-1 md:grid-cols-2 mx-10">
          <h2 className="md:text-3xl text-xl md:text-left text-center font-bold text-black mb-5">
            Article
          </h2>
          <p className="text-blue-400 hidden text-right md:block text-sm mr-5 mt-5 cursor-pointer">
            view all
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8 mx-10">
          {[
            "Lorem ipsum dolor sit amet consectetur adipisicing.",
            "Lorem ipsum dolor sit amet.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
          ].map((text, i) => (
            <div
              key={i}
              className="group hover:scale-105 transition-all duration-300 border rounded-lg bg-white overflow-hidden shadow-sm"
            >
              <div className="bg-white p-2 overflow-hidden text-center h-[70%] lg:h-[50%] flex items-center justify-center transition-all duration-300">
                <img
                  src="/home-banner.jpg"
                  alt="article"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <p className="pl-4 pb-3 mt-1 text-xs lg:text-sm font-semibold group-hover:underline decoration-blue-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

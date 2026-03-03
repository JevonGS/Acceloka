"use client";
import { useEffect, useState } from "react";
import { bookTickets } from "@/services/api";
import { useRouter } from "next/navigation";

export default function ViewCartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const removeItem = (ticketCode: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.ticketCode !== ticketCode,
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const body = {
        bookingItems: cartItems.map((item: any) => ({
          ticketCode: item.ticketCode,
          quantity: item.quantity,
        })),
      };
      await bookTickets(body);
      alert("Booking Success!");
      localStorage.removeItem("cart");
      router.push("/user/view-tickets");
    } catch (err: any) {
      setErrorMessage(err.detail || "Error booking tickets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-600 mb-4">Cart is empty.</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <p className="font-semibold text-lg">{item.ticketName}</p>
                  <p className="text-sm text-gray-500">
                    Code: {item.ticketCode}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p>Quantity: {item.quantity}</p>
                    <p className="font-bold">
                      Rp{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.ticketCode)}
                    className="text-red-500 hover:text-red-700 font-bold p-2"
                    title="Remove item"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 border-t pt-4 text-right">
              <p className="text-gray-600">
                Total Tickets:{" "}
                <span className="font-bold text-gray-900">{totalQuantity}</span>
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                Total price: Rp{totalPrice.toLocaleString()}
              </p>
            </div>

            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="cursor-pointer mt-6 w-full bg-[#2d2d2d] text-white py-3 rounded-lg font-semibold hover:bg-[#4d4d4d]"
            >
              {loading ? "..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

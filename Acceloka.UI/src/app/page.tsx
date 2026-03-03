import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Accelloka Ticketing
        </h1>
        <p className="text-gray-600 mt-2">Select your role to continue</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link href="/admin/view-available-tickets">
          <div className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition text-center border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          </div>
        </Link>

        <Link href="/user/home">
          <div className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition text-center border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">User Portal</h2>
          </div>
        </Link>
      </div>
    </main>
  );
}

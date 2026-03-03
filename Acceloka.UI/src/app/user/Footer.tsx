import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-bold text-white">Acceloka</h2>
          <p className="mt-2 text-sm">
            Efficient ticket booking system for your needs.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Blog</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">FAQ</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Instagram</Link>
            </li>
            <li>
              <Link href="#">Twitter</Link>
            </li>
            <li>
              <Link href="#">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-6 text-sm">
        &copy; {new Date().getFullYear()} Acceloka. All rights reserved.
      </div>
    </footer>
  );
}

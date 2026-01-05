import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const active = (p: string) =>
    pathname === p
      ? "text-white bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-2 rounded-md"
      : "text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md";

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center">
            F
          </div>
          <div>
            <div className="font-bold text-lg">FashionAI</div>
            <div className="text-xs text-gray-500">Your AI stylist</div>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/" className={active("/")}>Home</Link>
          <Link to="/tryon" className={active("/tryon")}>Try On</Link>
          <Link to="/wardrobe" className={active("/wardrobe")}>Wardrobe</Link>

          {user && (
            <Link to="/dashboard" className={active("/dashboard")}>
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-gray-700 hover:text-black"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-black text-white hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 rounded-full border"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-full bg-black text-white hover:opacity-90"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}

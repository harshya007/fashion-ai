import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-10 fade-in">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

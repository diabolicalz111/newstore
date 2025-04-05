"use client";

import { useState, useEffect } from "react";

export default function SubscriptionModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("hasSubscribed");
    if (!hasSubscribed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("hasSubscribed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-gray-800 via-black to-gray-800 p-6 rounded-lg shadow-lg relative w-11/12 max-w-md border border-yellow-500">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-300 text-2xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-extrabold text-yellow-500 mb-4 text-center">
          Join the Diabolical Club
        </h2>
        <p className="text-gray-300 mb-4 text-center">
          Get exclusive updates, discounts, and more. Be bold. Be diabolical.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="border border-yellow-500 rounded-lg px-4 py-2 bg-black text-yellow-500 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

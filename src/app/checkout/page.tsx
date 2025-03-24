"use client";

import { useState, useEffect } from "react";
import NavigationTabs from "../components/NavigationTabs";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      // Debugging: Log the cart data being sent
      console.log('Cart Data:', cart);

      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            price: item.priceId, // Ensure `priceId` matches your Stripe price IDs
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create Stripe Checkout session');
      }

      const session = await response.json();

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
      alert(`Failed to proceed to payment: ${error.message}`);
    }
  };

  return (
    <div className="text-white p-10">
      <NavigationTabs />
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-6">
        <h3 className="text-xl font-bold">Order Summary</h3>
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</h3>
      </div>
      <button
        onClick={handleCheckout}
        className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold"
      >
        Proceed to Payment
      </button>
    </div>
  );
}

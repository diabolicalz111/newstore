"use client";

import { useState, useEffect } from "react";
import NavigationTabs from "../components/NavigationTabs";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Define the type for cart items
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  priceId: string; // Add priceId to match Stripe's requirements
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]); // Explicitly type the cart state

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      console.log('Cart Data:', cart);

      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            price: item.priceId, // Ensure priceId matches your Stripe price IDs
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
      console.error('Error during checkout:', error instanceof Error ? error.message : error);
      alert(`Failed to proceed to payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="checkout-page">
      <NavigationTabs />
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="order-summary">
        <h3 className="text-xl font-bold">Order Summary</h3>
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.title}</span>
              <span>${item.price} x {item.quantity}</span>
            </li>
          ))}
        </ul>
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

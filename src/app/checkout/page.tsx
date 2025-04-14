"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, AddressElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCart } from '../context/CartContext'; // Import the useCart hook
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { cartItems } = useCart(); // Access cart data
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null); // Track fetch errors

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        console.log("Fetching client secret from /api/payment-intent...");
        const response = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems }),
        });

        console.log("Response status:", response.status); // Log response status
        const responseText = await response.text(); // Read the response as text for debugging
        console.log("Full server response:", responseText);

        if (!response.ok) {
          console.error("Failed to fetch client secret. Response status:", response.status);
          console.error("Response headers:", response.headers);
          setFetchError(`Failed to fetch client secret: ${responseText}`);
          return;
        }

        let data;
        try {
          data = JSON.parse(responseText); // Parse the response as JSON
        } catch (parseError) {
          console.error("Failed to parse response as JSON:", parseError);
          setFetchError("Server returned invalid JSON");
          return;
        }

        if (!data.clientSecret) {
          console.error("Invalid response from server:", data);
          setFetchError("Invalid response from server");
          return;
        }

        console.log("Client secret fetched successfully:", data.clientSecret);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setFetchError("An error occurred while fetching payment details. Please try again.");
      }
    };

    fetchClientSecret();
  }, [cartItems]); // Re-fetch client secret if cart changes

  // Added total calculation and display in the order summary
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // Added shipping cost to the order summary
  const shippingCost = 10.0; // Flat shipping cost
  const totalPriceWithShipping = totalPrice + shippingCost;

  return (
    <div className="checkout-page">
      <div className="checkout-content max-w-4xl mx-auto p-4">
        <div className="checkout-layout grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="form-section md:mt-[-20px]">
            <div className="checkout-form bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Checkout</h2>
              {fetchError ? (
                <p className="text-red-500 text-center">{fetchError}</p>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <p>Loading payment details...</p>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
            {cartItems.length > 0 ? (
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md mr-4 border border-gray-300"
                        width={80}
                        height={80}
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
            {cartItems.length > 0 && (
              <div className="mt-8 border-t pt-6 space-y-4">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="text-base">Subtotal:</span>
                  <span className="text-base font-medium text-right">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="text-base">Shipping:</span>
                  <span className="text-base font-medium text-right">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-xl text-gray-900">
                  <span>Total:</span>
                  <span className="text-right">${totalPriceWithShipping.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .checkout-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        .checkout-form {
          background: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .cart-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid #e5e7eb; /* Light gray border */
        }

        .cart-item img {
          max-width: 80px;
          max-height: 80px;
          margin-right: 1rem;
          border-radius: 8px;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cart-item-price {
          font-weight: bold;
          margin-top: 0.5rem;
        }

        .cart-item-quantity {
          margin-top: 0.25rem;
          color: #6b7280; /* Gray text */
        }

        @media (max-width: 640px) {
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .cart-item img {
            margin-bottom: 0.5rem;
          }

          .cart-item-details {
            align-items: flex-start;
          }
        }

        .order-summary {
          background: #ffffff; /* White background */
          color: #333;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .order-summary h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #111;
        }

        .order-summary ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .order-summary li {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .order-summary li:last-child {
          border-bottom: none;
        }

        .order-summary img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          margin-right: 1rem;
          border-radius: 4px;
        }

        .order-summary .details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .order-summary .details h3 {
          font-size: 1rem;
          font-weight: bold;
          margin: 0;
          color: #111;
        }

        .order-summary .details p {
          margin: 0.25rem 0;
          color: #555;
        }

        .order-summary .price {
          font-size: 1rem;
          font-weight: bold;
          color: #111;
        }

        .total {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .total .flex {
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .total .flex:last-child {
          margin-bottom: 0;
        }

        .total .font-bold {
          color: #111;
        }

        @media (max-width: 768px) {
          .order-summary {
            padding: 1rem;
          }

          .order-summary h2 {
            font-size: 1.25rem;
          }

          .order-summary img {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded");
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
      alert(error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div id="payment-element">
        <PaymentElement />
      </div>
      <div id="address-element">
        <AddressElement options={{ mode: "shipping" }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

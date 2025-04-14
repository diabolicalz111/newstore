"use client";

import React, { useState } from 'react';
import NavigationTabs from "../components/NavigationTabs";
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import stripePromise from '../../lib/stripe';
import Link from 'next/link';

const currencyVariable = "NZD"; // Default currency set to New Zealand Dollar
const localeVariable = "en-NZ"; // Default locale set to English - New Zealand

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 && subtotal < 150 ? 10.00 : 0; // Free shipping over $150
  const total = subtotal + shipping;
  const skuVariable = cartItems.map(item => item.id); // Extract SKUs from cart items
  const categoryVariable = cartItems.map(item => "Uncategorized"); // Default all categories to 'Uncategorized'

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/checkout/intent', { // Ensure this matches the correct route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const responseText = await response.text(); // Read the response as text for debugging
      console.log("Full server response:", responseText);

      if (!response.ok) {
        console.error("Failed to create PaymentIntent. Response status:", response.status);
        console.error("Response headers:", response.headers);
        throw new Error(`Failed to create PaymentIntent: ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText); // Parse the response as JSON
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Server returned invalid JSON");
      }

      const { clientSecret } = data;
      if (!clientSecret) {
        console.error("Invalid response from server:", data);
        throw new Error("Invalid response from server");
      }

      console.log("Client secret received:", clientSecret);

      // Redirect to the checkout page where Stripe Elements is rendered
      router.push('/checkout');
    } catch (error) {
      console.error('Error during checkout:', error);
      setError(
        error instanceof Error 
          ? `${error.message}${error.stack ? `\n\nStack trace:\n${error.stack}` : ''}`
          : 'Failed to checkout. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <NavigationTabs />
        <div className="cart-content">
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link href="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <NavigationTabs />
      <div className="cart-content">
        <h1 className="cart-title">Shopping Cart</h1>
        
        {error && (
          <div className="error-message" style={{ 
            color: 'red', 
            padding: '10px', 
            margin: '10px 0', 
            backgroundColor: 'rgba(255, 0, 0, 0.1)', 
            borderRadius: '4px' 
          }}>
            {error}
          </div>
        )}
        
        <style jsx>{`
          .cart-container {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
            padding: 2rem;
            background-color: #1a1a1a; /* Darker background */
          }

          .cart-items {
            background: #2a2a2a; /* Darker grey background */
            color: #f5f5f5; /* Light text for contrast */
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .cart-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 0;
            border-bottom: 1px solid #444;
          }

          .cart-item:last-child {
            border-bottom: none;
          }

          .cart-item img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            margin-right: 1rem;
            border-radius: 4px;
          }

          .cart-item-details {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .cart-item-details h3 {
            font-size: 1rem;
            font-weight: bold;
            margin: 0;
            color: #f5f5f5;
          }

          .cart-item-details p {
            margin: 0.25rem 0;
            color: #ccc;
          }

          .cart-item-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .cart-item-actions input[type="number"] {
            width: 60px;
            padding: 0.5rem;
            border: 1px solid #444;
            border-radius: 4px;
            background: #1a1a1a;
            color: #f5f5f5;
            text-align: center;
            font-size: 1rem;
          }

          .cart-item-actions input[type="number"]:focus {
            outline: none;
            border-color: #888;
          }

          .cart-item-actions button {
            padding: 0.5rem 1rem;
            background: #444;
            color: #f5f5f5;
            border: none;
            border-radius: 4px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: background 0.3s;
          }

          .cart-item-actions button:hover {
            background: #555;
          }

          .cart-item-actions button:active {
            background: #666;
          }

          .cart-summary {
            background: #2a2a2a; /* Darker grey background */
            color: #f5f5f5; /* Light text for contrast */
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .cart-summary h2 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #f5f5f5;
          }

          .cart-summary .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
          }

          .cart-summary .summary-item:last-child {
            margin-bottom: 0;
          }

          .cart-summary .summary-total {
            font-size: 1.25rem;
            font-weight: bold;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #444;
          }

          .cart-summary button {
            width: 100%;
            background: #444; /* Dark button */
            color: #f5f5f5;
            padding: 0.75rem;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            margin-top: 1rem;
          }

          .continue-shopping-btn {
            display: block !important;
            width: 100% !important;
            background: #444 !important; /* Match the Proceed to Checkout button */
            color: #f5f5f5 !important;
            padding: 0.75rem !important;
            border: none !important;
            border-radius: 4px !important;
            font-size: 1rem !important;
            font-weight: bold !important;
            text-align: center !important;
            cursor: pointer !important;
            margin-top: 1rem !important;
            text-decoration: none !important; /* Remove underline for links */
            transition: background 0.3s !important;
          }

          .continue-shopping-btn:hover {
            background: #555 !important;
          }

          .continue-shopping-btn:active {
            background: #666 !important;
          }

          @media (max-width: 768px) {
            .cart-container {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="image-class"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `NZD $${shipping.toFixed(2)}`}</span>
            </div>
            {subtotal < 150 && (
              <div className="free-shipping-message" style={{ 
                padding: '10px', 
                fontSize: '0.9rem', 
                color: '#666',
                textAlign: 'center',
                borderRadius: '4px',
                background: '#f5f5f5',
                margin: '10px 0'
              }}>
                Add NZD ${(150 - subtotal).toFixed(2)} more to qualify for free shipping!
              </div>
            )}
            <div className="summary-total">
              <span>Total:</span>
              <span>NZD ${total.toFixed(2)}</span>
            </div>
            <square-placement
              data-mpid="c55a7c48-bc47-4bfd-bc92-c3f22fea0794"
              data-placement-id="05eae66e-afae-4bed-bc08-3c97b11390da"
              data-page-type="cart"
              data-amount={total}
              data-currency={currencyVariable}
              data-consumer-locale={localeVariable}
              data-item-skus={skuVariable}
              data-item-categories={categoryVariable}
              data-is-eligible="true"
            />
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isLoading || cartItems.length === 0}
            >
              {isLoading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <Link href="/shop" className="continue-shopping-btn" style={{ marginTop: '10px', display: 'block' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

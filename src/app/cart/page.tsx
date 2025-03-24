"use client";

import React, { useState } from 'react';
import NavigationTabs from "../components/NavigationTabs";
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import stripePromise from '../../lib/stripe';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 && subtotal < 150 ? 5.00 : 0; // Free shipping over $150
  const total = subtotal + shipping;

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!process.env.NEXT_PUBLIC_SITE_URL) {
        throw new Error('Site URL is not configured');
      }

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      console.log('Starting checkout process');
      console.log('Cart items:', cartItems);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            ...item,
            description: `${item.name} - 20" Chain`,
            image: item.image || '/images/gold1.jpg',
            quantity: item.quantity || 1
          })),
          shipping: shipping
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      router.push(url);
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
        
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="product-image"
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">NZD ${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>NZD ${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
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
              <div className="summary-row total">
                <span>Total (Tax Included)</span>
                <span>NZD ${total.toFixed(2)}</span>
              </div>
            </div>
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

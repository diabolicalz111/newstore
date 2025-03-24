"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavigationTabs from '../components/NavigationTabs';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <div className="success-page">
      <NavigationTabs />
      <div className="success-content">
        <h1 className="success-title">Thank You for Your Purchase!</h1>
        <p className="success-message">
          Your order has been successfully processed. You will receive a confirmation email shortly.
        </p>
        <button 
          className="continue-shopping-btn"
          onClick={() => router.push('/')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
} 
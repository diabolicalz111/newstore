"use client";

import './globals.css';
import { CartProvider } from './context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Diabolical Jewellery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Elements stripe={stripePromise}>
          <CartProvider>
            {children}
          </CartProvider>
        </Elements>
      </body>
    </html>
  );
}

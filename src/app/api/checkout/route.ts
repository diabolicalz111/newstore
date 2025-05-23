import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with error handling
let stripe: Stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
} catch (error) {
  console.error('Failed to initialize Stripe:', error);
  throw error;
}

export async function POST(request: Request) {
  console.log("API route '/api/checkout/intent' hit"); // Add this log
  try {
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2)); // Pretty-print for better debugging

    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items array:", items);
      return NextResponse.json({ error: "Invalid items array" }, { status: 400 });
    }

    // Calculate total amount
    const amount = items.reduce((total: number, item: { price: number, quantity: number }) => {
      if (!item.price || !item.quantity) {
        console.error("Invalid item:", item);
        throw new Error("Each item must have a price and quantity");
      }
      return total + item.price * item.quantity;
    }, 0);

    console.log("Total amount (in cents):", Math.round(amount * 100));

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "nzd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("PaymentIntent created successfully:", paymentIntent.id);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error in checkout API:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
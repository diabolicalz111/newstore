import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    console.log("API route '/api/payment-intent' hit");
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));

    const { items } = body;

    // Validate the items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items array:", items);
      return NextResponse.json({ error: "Invalid items array" }, { status: 400 });
    }

    // Calculate total amount
    const amount = items.reduce((total: number, item: { price: number; quantity: number }) => {
      if (!item.price || !item.quantity) {
        console.error("Invalid item:", item);
        throw new Error("Each item must have a price and quantity");
      }
      return total + item.price * item.quantity;
    }, 0);

    console.log("Total amount (in cents):", Math.round(amount * 100));

    // Include product details in metadata
    const metadata = items.reduce((acc: any, item: { name: string; quantity: number }) => {
      acc[`product_${item.name}`] = `Quantity: ${item.quantity}`;
      return acc;
    }, {});

    // Add a flat shipping cost
    const shippingCost = 1000; // Flat shipping cost in cents
    const totalAmount = Math.round(amount * 100) + shippingCost; // Add shipping cost to total amount

    // Create a PaymentIntent with metadata and updated amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount, // Include shipping cost
      currency: "nzd",
      automatic_payment_methods: { enabled: true },
      metadata, // Add metadata here
    });

    console.log("PaymentIntent created successfully:", paymentIntent.id);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error in payment-intent API:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

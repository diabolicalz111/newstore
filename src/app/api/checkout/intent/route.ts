import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    console.log("API route '/api/checkout/intent' hit");
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));

    // Define the expected structure of items
    type Item = {
      price: number;
      quantity: number;
    };

    const { items }: { items: Item[] } = body;

    // Validate the items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items array:", items);
      return NextResponse.json({ error: "Invalid items array" }, { status: 400 });
    }

    // Calculate total amount
    const amount = items.reduce((total: number, item: Record<string, unknown>) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || isNaN(quantity)) {
        console.error("Invalid item price or quantity:", item);
        throw new Error("Each item must have a valid price and quantity");
      }

      return total + price * quantity;
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

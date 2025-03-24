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
  try {
    const body = await request.json();
    const { items } = body;

    console.log('Received checkout request');
    console.log('Request body:', body);

    // Calculate subtotal to determine shipping
    const subtotal = items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    const shipping = subtotal < 150 ? 5.00 : 0; // Free shipping over $150

    // Create line items for products
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'nzd',
        product_data: {
          name: item.name,
          description: item.description,
          images: [new URL(item.image, request.url).toString()]
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }));

    // Add shipping as a separate line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'nzd',
          product_data: {
            name: 'Shipping',
            description: 'Standard shipping within New Zealand'
          },
          unit_amount: Math.round(shipping * 100)
        },
        quantity: 1
      });
    }

    console.log('Line items created:', lineItems);

    // Create Stripe checkout session
    console.log('Creating Stripe session');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      currency: 'nzd'
    });

    console.log('Stripe session created:', session.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error in checkout API:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 
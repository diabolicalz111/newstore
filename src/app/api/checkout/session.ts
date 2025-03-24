import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Incoming request to /api/checkout/session');
      console.log('Request Body:', req.body);

      if (!req.body.items || !Array.isArray(req.body.items)) {
        throw new Error('Invalid request: "items" must be an array.');
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items, // Ensure this matches your Stripe price IDs
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      });

      console.log('Stripe Checkout Session created successfully:', session.id);

      res.status(200).json({ id: session.id });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating Stripe Checkout session:', error.message);
        res.status(500).json({ error: error.message });
      } else {
        console.error('Unexpected error:', JSON.stringify(error));
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  } else {
    console.log('Invalid HTTP method:', req.method);
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

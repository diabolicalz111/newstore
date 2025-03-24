import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Debugging: Log the incoming request body
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

      // Debugging: Log the created session
      console.log('Created Stripe Session:', session);

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

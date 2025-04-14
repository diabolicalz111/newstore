import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      console.log("Request received at /api/checkout/intent");
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        console.error("Invalid items array:", items);
        return res.status(400).json({ error: "Invalid items array" });
      }

      console.log("Received items:", items);

      const amount = items.reduce((total: number, item: any) => {
        if (!item.price || !item.quantity) {
          console.error("Invalid item:", item);
          throw new Error("Each item must have a price and quantity");
        }
        return total + item.price * item.quantity;
      }, 0);

      console.log("Total amount (in cents):", Math.round(amount * 100));

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "nzd",
        automatic_payment_methods: { enabled: true },
      });

      console.log("PaymentIntent created successfully:", paymentIntent.id);

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    console.log("Invalid HTTP method:", req.method);
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

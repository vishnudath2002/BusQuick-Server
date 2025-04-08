import { IPaymentService } from "../../core/interfaces/IPaymentService";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class PaymentService implements IPaymentService {
  async createCheckoutSession(name: string, description: string, price: string, quantity: string) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: name,
                description: description,
              },
              unit_amount: Math.round(Number(price) * 100), // Convert price properly
            },
            quantity: Number(quantity), // Ensure quantity is a number
          },
        ],
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/checkout-cancelled`,
      });

      return { success: true, url: session.url };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return { success: false, error: "Failed to create checkout session." };
    }
  }
}
export interface IPaymentService {
  
    createCheckoutSession(name: string ,description: string, price: string, quantity: string): Promise<{ success: boolean; url?: string | null; error?: string }>;
  }
  
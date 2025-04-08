import { IPaymentService } from "../../../core/interfaces/IPaymentService";


export class Checkout {
  constructor(private paymentService: IPaymentService) {}

  async execute(name: string ,description: string, price: string, quantity: string) {
    const result = await this.paymentService.createCheckoutSession(name,description, price, quantity);
    
    if (!result.success) {
      return { success: false, message: result.error || "Checkout session creation failed." };
    }

    return { success: true, url: result.url };
  }
}

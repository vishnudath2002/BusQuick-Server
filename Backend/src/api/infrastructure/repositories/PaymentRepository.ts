
import { Payment } from "../../../core/entities/Payment";
import { IPaymentRepository } from "../../../core/interfaces/IPaymentRepository";
import Payments from "../db/models/Payments";


export class PaymentRepository implements IPaymentRepository {
    async save(payment: Payment): Promise<string> {
        
        const paymentToSave = new Payments(payment);
        await paymentToSave.save();
        return payment.Booking_Id;
    }
}
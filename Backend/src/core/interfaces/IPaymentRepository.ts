import { Payment } from "../entities/Payment";

export interface IPaymentRepository {
    save(payment: Payment): Promise<string>;
}

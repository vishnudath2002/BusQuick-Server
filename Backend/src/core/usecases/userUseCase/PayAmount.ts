import { IPaymentRepository } from "../../../core/interfaces/IPaymentRepository";
import { Payment } from "../../entities/Payment";



export class PayAmount {
    constructor(
        private paymentRepository: IPaymentRepository
    ){}

    async execute(payment: Payment){

       const result = await this.paymentRepository.save(payment);
       if(!result){
        return { success: false, message: "payment failed"}
       }
       return { success: true, message: "payment successful"}
    }

}
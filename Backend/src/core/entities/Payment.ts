export class Payment {
    constructor(
        public Amount: string,
        public Payment_Status: string,
        public Booking_Id: string,
        public Payment_Date: Date
    ){}
}
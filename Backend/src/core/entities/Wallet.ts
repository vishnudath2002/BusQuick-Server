export class Wallet {
    constructor(
      public balance: number = 0, 
      public user_Id: string | null, 
      public transactionHistory: {
        amount: number;
        date?: Date | null;
        type: "credit" | "debit";
      }[] = []
    ) {}
  }
  
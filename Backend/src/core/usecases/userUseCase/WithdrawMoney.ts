import { IWalletRepository } from "../../interfaces/IWalletRepository";



export class WithdrawMoney {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(userId: string, amount: number) {

    if (amount <= 0) {
      return { success: false, message: "Invalid amount" };
    }

    const result = await this.walletRepository.withdrawMoney(userId, amount);

    if (typeof result === "string") {
      return { success: false, message: result };
    }

    return { success: true, message: "Money withdrawn successfully", wallet: result };

  }
}

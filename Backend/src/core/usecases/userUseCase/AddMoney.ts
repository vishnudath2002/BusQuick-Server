import { IWalletRepository } from "../../interfaces/IWalletRepository";



export class AddMoney {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(userId: string, amount: number) {
    if (amount <= 0) {
      return { success: false, message: "Invalid amount" };
    }

    const wallet = await this.walletRepository.addMoney(userId, amount);

    if (!wallet) {
      return { success: false, message: "Wallet not found" };
    }

    return { success: true, message: "Money added successfully", wallet };
  }
}



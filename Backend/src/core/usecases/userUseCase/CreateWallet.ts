import { IWalletRepository } from "../../interfaces/IWalletRepository";

export class CreateWallet {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(userId: string) {
    const wallet = await this.walletRepository.createWallet(userId);

    if (!wallet) {
      return { success: false, message: "Failed to create wallet" };
    }

    return { success: true, message: "Wallet created successfully", wallet };
  }
}





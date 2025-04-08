import { IWalletRepository } from "../../interfaces/IWalletRepository";

export class ShowWallet {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(userId: string) {
    const wallet = await this.walletRepository.getWallet(userId);
    if (wallet == null) {
      return { success: false, message: "Failed to get wallet" };
    }

    return { success: true, message: "Wallet retrieved successfully", wallet };
  }
}

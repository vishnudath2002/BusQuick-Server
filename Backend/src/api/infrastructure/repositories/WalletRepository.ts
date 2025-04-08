import { Types } from "mongoose";
import Wallets, { IWallet } from "../db/models/Wallets"; 

export class WalletRepository {
  
  async createWallet(userId: string): Promise<IWallet> {
    
    let wallet = await this.findByUserId(userId);
    if (!wallet) {
      wallet = new Wallets({
        User_Id: new Types.ObjectId(userId),
        Balance: 0,
        Transaction_History: [],
      });
      await wallet.save();
    }
    return wallet;
  }

  async findByUserId(userId: string): Promise<IWallet | null> {
    return await Wallets.findOne({ User_Id: new Types.ObjectId(userId) }).exec();
  }

  async addMoney(userId: string, amount: number): Promise<IWallet | null> {
    const wallet = await this.createWallet(userId); 
    wallet.Balance += Number(amount);

    wallet.Transaction_History.push({
      Amount: amount,
      Date: new Date(),
      Type: "credit"
    });

    return await wallet.save();
  }

  async withdrawMoney(userId: string, amount: number): Promise<IWallet | string> {
    const wallet = await this.findByUserId(userId);
    if (!wallet) return "Wallet not found";

    if (wallet.Balance < amount) return "Insufficient balance";

    wallet.Balance -= amount;

    wallet.Transaction_History.push({
      Amount: amount,
      Date: new Date(),
      Type: "debit",
    });

    return await wallet.save();
  }

  async getWallet(userId: string): Promise<IWallet | null> {
    return await this.findByUserId(userId);
  }

  
}

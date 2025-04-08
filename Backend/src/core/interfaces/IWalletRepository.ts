import  { IWallet } from "../../api/infrastructure/db/models/Wallets"; 

export interface IWalletRepository {
    createWallet(userId: string): Promise<IWallet>;
    findByUserId(userId: string): Promise<IWallet | null>
    addMoney(userId: string, amount: number): Promise<IWallet | null>;
    withdrawMoney(userId: string, amount: number): Promise<IWallet | string>;
    getWallet(userId: string): Promise<IWallet | null>
}
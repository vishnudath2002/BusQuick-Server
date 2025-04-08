import { UserRepository } from "../../../api/infrastructure/repositories/UserRepository";



export class EditPassword { 
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(email: string, oldPassword: string, newPassword: string) {
        const success = await this.userRepository.changePassword(email,oldPassword,newPassword);
        if (!success.status) {
            return { success: false , message: success.message };
        }
        return { success: true , message: success.message };
    }
}
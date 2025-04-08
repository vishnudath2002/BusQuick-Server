import { UserRepository } from "../../../api/infrastructure/repositories/UserRepository";

export class EditEmail { 
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(id: string, email: string) {
        const success = await this.userRepository.editEmail(id, email);
        if (!success) {
            return { success: false, message: "user not found" };
        }
        return { success: true, message: "email updated successfully" };
    }
}
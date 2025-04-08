import { UserRepository } from "../../../api/infrastructure/repositories/UserRepository";

export class EditPhone {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(id: string, phone: string) {
        const success = await this.userRepository.editPhone(id, phone);
        if (!success) {
            return { success: false, message: "user not found" };
        }
        return { success: true, message: "phone updated successfully" };
    }
}
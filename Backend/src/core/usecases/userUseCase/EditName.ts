import { UserRepository } from "../../../api/infrastructure/repositories/UserRepository";

export class EditName {

    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(id: string, name: string) {
        const success = await this.userRepository.editName(id, name);
        if (!success) {
            return { success: false, message: "user not found" };
        }
        return { success: true, message: "name updated successfully" };
    }

}
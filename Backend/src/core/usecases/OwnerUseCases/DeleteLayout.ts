import { ILayoutRepository } from "../../interfaces/ILayoutRepository";

export class DeleteLayout {
    constructor(private layoutRepository: ILayoutRepository) {}

    async execute(busId: string) {
        const result = await this.layoutRepository.deleteLayoutByBusId(busId);
        if (!result.success) {
            return { success: false, message: "No layouts found for this bus ID" };
        }
        return { success: true, message: `Deleted ${result.message}` };
    }
}

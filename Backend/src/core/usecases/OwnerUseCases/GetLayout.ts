import { ILayoutRepository } from "../../interfaces/ILayoutRepository";

export class GetLayout {
    constructor(private layoutRepository: ILayoutRepository) {}

    async execute(busId: string) {
        const layouts = await this.layoutRepository.getLayoutByBusId(busId);
        
        if (!layouts || layouts.length === 0) {
            return { success: false, message: "No layouts found for this bus ID" };
        }

        return { success: true, message: "Layouts retrieved successfully", layouts };
    }
}

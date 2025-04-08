import { ILayoutRepository } from "../../interfaces/ILayoutRepository";
import { ILayouts } from "../../../api/infrastructure/db/models/Layouts";

export class UpdateLayout {
    
    constructor(private layoutRepository: ILayoutRepository) {}

    async execute(layoutId: string, updatedData: Partial<ILayouts>) {
        const updatedLayout = await this.layoutRepository.updateLayout(layoutId, updatedData);
        if (!updatedLayout) {
            return { success: false, message: "Layout not found or update failed" };
        }
        return { success: true, message: "Layout updated successfully", updatedLayout };
    }

}

import Layouts, { ILayouts } from "../db/models/Layouts";
import { Types } from "mongoose";
import { ILayoutRepository } from "../../../core/interfaces/ILayoutRepository";

export class LayoutRepository implements ILayoutRepository {
  
  async saveLayout(layouts: ILayouts[]): Promise<ILayouts[]> {
    return await Layouts.insertMany(layouts);
  }

  async getLayoutByBusId(busId: string): Promise<ILayouts[]> {
    return await Layouts.find({ busId: new Types.ObjectId(busId) });
  }

   // Update layout by ID
   async updateLayout(layoutId: string, updatedData: Partial<ILayouts>): Promise<ILayouts | null> {
    return await Layouts.findByIdAndUpdate(
      new Types.ObjectId(layoutId),
      { $set: updatedData },
      { new: true } // Return updated document
    );
  }

  async deleteLayoutByBusId(busId: string): Promise<{ success: boolean; message: string }> {
    const result = await Layouts.deleteMany({ busId: new Types.ObjectId(busId) });
    if (result.deletedCount === 0) {
      return { success: false, message: "No layouts found for this bus ID" };
    }
    return { success: true, message: `${result.deletedCount} layouts deleted successfully` };
  }

}

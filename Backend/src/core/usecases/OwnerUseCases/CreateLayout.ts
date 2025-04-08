import { ILayoutRepository } from "../../interfaces/ILayoutRepository";
import LayoutModel from "../../../api/infrastructure/db/models/Layouts"; // Ensure correct import
import { Types } from "mongoose";
import { IBusRepository } from "../../interfaces/IBusRepository";

export interface LayoutConfig {
  rows: number;
  columnConfig: Array<number | "aisle">[];
  busId: string;
}

export class CreateLayout {
  constructor(private layoutRepository: ILayoutRepository,private busRepository: IBusRepository) {}

  async execute(config: LayoutConfig) {
    try {
      
      const existingLayout = await LayoutModel.findOne({ busId: new Types.ObjectId(config.busId) });

      if (existingLayout) {
        return { success: false, message: "Layout for this bus already exists" };
      }

      const existingBus = await this.busRepository.findById(config.busId);
      if (!existingBus) {
        return { success: false, message: "Bus not found" };
      }
  
      // ✅ Calculate total seats in layout
      let totalSeats = 0;
      for (const row of config.columnConfig) {
        totalSeats += row.filter((col) => col !== "aisle").reduce((sum, num) => sum + (num as number), 0);
      }
  
      // ✅ Validate seat count with bus.SeatsTotal
      if (totalSeats !== existingBus.seatsTotal) {
        return { success: false, message: "Number of seats does not match the bus configuration" };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const layout: any[] = [];
      let seatNumber = 1;

      for (let i = 0; i < config.rows; i++) {
        let colIndex = 0;
        const rowConfig = config.columnConfig[i] || config.columnConfig[config.columnConfig.length - 1];

        for (let j = 0; j < rowConfig.length; j++) {
          if (rowConfig[j] === "aisle") {
            continue;
          }

          if (typeof rowConfig[j] === "number") {
            for (let k = 0; k < (rowConfig[j] as number); k++) {
              const section = j < rowConfig.length / 2 ? "left" : "right";
              layout.push(
                new LayoutModel({
                  busId: new Types.ObjectId(config.busId),
                  row: i,
                  column: colIndex++,
                  section,
                  seatNumber: seatNumber++,
                })
              );
            }
          }
          colIndex++;
        }
      }


      const result = await LayoutModel.insertMany(layout);

      if (!result) {
        return { success: false, message: "Layout creation failed", result };
      }

      return { success: true, message: "Layout added successfully", result };
    } catch (error) {
      throw new Error("Error creating layout: " + error);
    }
  }
}

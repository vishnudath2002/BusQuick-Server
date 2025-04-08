import { ILayouts } from "../../api/infrastructure/db/models/Layouts";


export interface ILayoutRepository {

  saveLayout(layouts: ILayouts[]): Promise<ILayouts[]>
  getLayoutByBusId(busId: string): Promise<ILayouts[]>
  updateLayout(layoutId: string, updatedData: Partial<ILayouts>): Promise<ILayouts | null>
  deleteLayoutByBusId(busId: string): Promise<{ success: boolean; message: string }>
  
}

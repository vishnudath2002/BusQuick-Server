import { IBusRepository } from "../../interfaces/IBusRepository";
import { Bus } from "../../entities/Bus";

export class AddBus {
  constructor(private _busRepository: IBusRepository) {}

  async execute(bus: Bus) {
    const result = await this._busRepository.addBus(bus);
    if(!result){
        return {success: false, message: "Bus not added because it already exists",data:null}
    }
    return {success: true, message: "Bus added",data:result}
  }

}

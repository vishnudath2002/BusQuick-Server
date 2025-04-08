import { IRouteRepository } from "../../interfaces/IRouteRepository";


export class searchDest {
    constructor(
        private routeRepository: IRouteRepository
    ){}
    async execute(query: string){
       const destinations = await this.routeRepository.searchDestinations(query)

       if(!destinations){
        return { success: false, message: "No destinations available" , data:null};
       }

       return { success: true, message: " available ", data: destinations}
    }
} 
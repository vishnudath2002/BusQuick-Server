import { IRouteRepository } from "../../interfaces/IRouteRepository";


export class searchSour {
    constructor(
        private routeRepository: IRouteRepository
    ){}
    async execute(query: string){
       const destinations = await this.routeRepository.searchSources(query)

       if(!destinations){
        return { success: false, message: "No sources available" , data:null};
       }

       return { success: true, message: " available ", data: destinations}
    }
} 
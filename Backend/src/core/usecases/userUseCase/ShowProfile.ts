import { IUserRepository } from "../../interfaces/IUserRepository";


export class ShowProfile { 
    constructor(
        private userRepository: IUserRepository
    ) {}


async execute(id: string){
   
    const user = await this.userRepository.findById(id);

    if(!user){
        return { success: false , message: "user not found" }
    };

    if (user.isBlocked){
        return { success: false , message: "user blocked"}
    }

    return {
        success: true,
        user
    }


}

}

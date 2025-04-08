import { IUserRepository } from "../../interfaces/IUserRepository";


export class GetOperators {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute() {

    const operators = await this.userRepository.findByRole("operator");

    if (!operators || operators.length === 0) {
      return { success: false, message: "No operators" };
    }

    return {
      success: true,
      message: "operators list fetched successfully",
      operators: operators,
    };

  }

  
}
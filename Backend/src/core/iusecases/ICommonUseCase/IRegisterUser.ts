export interface IRegisterUser {
  execute(
    name: string,
    email: string,
    password: string,
    phone: string,
    role: string
  ): Promise<{
    success: boolean;
    message: string;
  }>;
}

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public phone: string,
    public photo: string = '',
    public role: string,
    public isBlocked: boolean = false,
    public otpVerified: boolean = false,
    public createdAt: Date = new Date()
  ) {}
}

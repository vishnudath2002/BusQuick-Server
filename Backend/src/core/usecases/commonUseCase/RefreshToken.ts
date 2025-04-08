import { IAuthService } from '../../interfaces/IAuthService';


export class RefreshToken {

  constructor(
    private authService: IAuthService
  ) {}
  async execute(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      console.log("refresh token not provided");
      
      throw new Error('Refresh token not provided');
    }
   
    

    const payload = await this.authService.verifyRefreshToken(refreshToken)
    if(!payload){
      throw new Error('Invalid refresh token');
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newAccessToken = await this.authService.generateAccessToken((payload as any).id,(payload as any).role);

    // Create new refresh token

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newRefreshToken = await this.authService.generateRefreshToken((payload as any).id,(payload as any).role);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

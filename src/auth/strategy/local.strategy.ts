import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, pass: string): Promise<any> {
    const user = await this.authService.validateUser(username, pass);
    
    if (!user) {
      throw new UnauthorizedException();
    }

    const { password, token, ...result } = user;

    console.log("Validate Local Strategy")

    return result
  }
}
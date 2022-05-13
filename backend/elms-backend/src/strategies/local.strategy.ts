import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      console.log(username);
      const user = await this.authService.authenticateUser({
        email: username,
        password: password,
      });
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
    return null;
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthConfig } from '../config/auth.config';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private authConfig: AuthConfig, private employeeService: EmployeeService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    console.log(payload.email);
    const user = await this.employeeService.getEmployeeByEmail(payload.email);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
    return user;
  }
}

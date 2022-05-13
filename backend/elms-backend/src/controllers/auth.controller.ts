import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return req.user;
  }

  @Post('confirm')
  async confirm(@Body() confirmRequest: { code: string; email: string }) {
    try {
      return await this.authService.confirmRegistration(confirmRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('register')
  async register(
    @Body()
    registerRequest: {
      email: string;
      name: string;
      password: string;
    },
  ) {
    try {
      return await this.authService.registerUser(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

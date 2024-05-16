import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AuthLoginDto, AuthRegisterDto } from "@/validators/auth.validator";
import { AuthService } from "@/services/auth/auth.service";
import { Public } from "@/decorators/public.decorator";
import { authConfig } from "@/configs";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@Public()

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @HttpCode(200)
  @Post("login")
  async login(@Body() userData: AuthLoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(userData);
    res.cookie(authConfig.jwtCookieName, result[authConfig.jwtCookieName])
      .send(result);
  }

  @Post("register")
  async register(@Body() userData: AuthRegisterDto) {
    return this.authService.register(userData);
  }
}
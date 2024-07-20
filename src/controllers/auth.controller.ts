import { Body, Controller, HttpCode, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { AuthLoginDto, AuthRegisterDto, AuthUpdateDto, PasswordChangeDto } from "@/validators/auth.validator";
import { AuthService } from "@/services/auth/auth.service";
import { Public } from "@/decorators/public.decorator";
import { authConfig } from "@/configs";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { Author } from "@/decorators/author.decorator";
import { JwtAuthStrategy } from "@/services/auth/jwt-auth.strategy";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @HttpCode(200)
  @Post("login")
  async login(@Body() userData: AuthLoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(userData);
    res.cookie(authConfig.jwtCookieName, result[authConfig.jwtCookieName])
      .send(result);
  }

  @Public()
  @Post("register")
  async register(@Body() userData: AuthRegisterDto) {
    return this.authService.register(userData);
  }

  @Put(":id/profile")
  updateUser(@Author() userData: AuthUpdateDto, @Param("id") id: string) {
    return this.authService.updateUser(userData, id);
  }

  @Put(":id/password")
  changePassword(@Author() passwordData: PasswordChangeDto, @Param("id") id: string) {
    return this.authService.updatePassword(passwordData, id);
  }
}
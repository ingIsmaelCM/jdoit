import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "@/services/auth/auth.service";
import { IUser } from "@/models/user.model";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(userData: IUser): Promise<IUser> {
    console.log(userData)
    const user = await this.authService.validateUser(userData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
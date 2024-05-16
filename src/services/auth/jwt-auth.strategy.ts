import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "@/services/auth/auth.service";
import { IUser } from "@/models/user.model";
import { ExtractJwt, Strategy } from "passport-jwt";
import { appConfig, authConfig } from "@/configs";
import fromExtractors = ExtractJwt.fromExtractors;
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;
import { Request } from "express";

function cookieExtractor(req: Request) {
  let token = null;
  if (req && req.cookies)
  {
    token = req.cookies[authConfig.jwtCookieName];
  }
  return token;
};
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: fromExtractors([cookieExtractor, fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: appConfig.key
    });

  }

  async validate(userData: IUser): Promise<IUser> {
    return userData;
  }

}
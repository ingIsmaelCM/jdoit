import { Module } from "@nestjs/common";
import { UserModule } from "@/modules/user.module";
import { JwtModule } from "@nestjs/jwt";
import { appConfig, authConfig } from "@/configs";
import { AuthController } from "@/controllers/auth.controller";
import { AuthService } from "@/services/auth/auth.service";
import { LocalAuthStrategy } from "@/services/auth/local-auth.strategy";
import { JwtAuthStrategy } from "@/services/auth/jwt-auth.strategy";


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: String(appConfig.key),
      signOptions: {
        expiresIn: authConfig.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy],
  exports: [AuthService, JwtModule]
})

export class AuthModule {
}
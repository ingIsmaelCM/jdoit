import { Module } from "@nestjs/common";
import { UserModule } from "@/modules/user.module";
import { JwtModule } from "@nestjs/jwt";
import { appConfig, authConfig } from "@/configs";
import { AuthController } from "@/controllers/auth.controller";
import { AuthService } from "@/services/auth/auth.service";
import { LocalAuthStrategy } from "@/services/auth/local-auth.strategy";
import { JwtAuthStrategy } from "@/services/auth/jwt-auth.strategy";
import FoodRepository from "@/repositories/food.repository";
import FoodModule from "@/modules/food.module";
import NutrientRepository from "@/repositories/nutrient.repository";
import InfoRepository from "@/repositories/info.repository";
import AddressRepository from "@/repositories/address.repository";


@Module({
  imports: [
    UserModule, FoodModule,
    JwtModule.register({
      secret: String(appConfig.key),
      signOptions: {
        expiresIn: authConfig.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy,
     InfoRepository, AddressRepository],
  exports: [AuthService, JwtModule]
})

export class AuthModule {
}
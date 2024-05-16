import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "@/modules/user.module";
import { AuthModule } from "@/modules/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "@/middlewares/jwt.guard";
import { JwtAuthStrategy } from "@/services/auth/jwt-auth.strategy";
import { PatientModule } from "@/modules/patient.module";
import FoodModule from "@/modules/food.module";
import ProvinceModule from "@/modules/province.module";


@Module({
  imports: [
    UserModule, AuthModule, PatientModule, FoodModule, ProvinceModule
  ],
  controllers: [AppController],

  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    },
    JwtAuthStrategy,
  ]
})
export class AppModule {
}

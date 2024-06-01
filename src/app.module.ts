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
import { CacheModule } from "@nestjs/cache-manager";
import { ScheduleModule } from "@nestjs/schedule";
import CategoryModule from "@/modules/category.module";
import PlanModule from "@/modules/plan.module";
import EventModule from "@/modules/event.module";
import { BullModule } from "@nestjs/bull";


@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'redis-12502.c309.us-east-2-1.ec2.redns.redis-cloud.com:',
        port: 12502,
      },
    }),
    CacheModule.register(),
    UserModule, AuthModule, PatientModule, FoodModule, ProvinceModule,
    CategoryModule, PlanModule, EventModule
  ],
  controllers: [AppController],

  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    },
    JwtAuthStrategy
  ]
})
export class AppModule {
}

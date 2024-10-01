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
import EvalModule from "@/modules/eval.module";
import WhatsappModule from "@/modules/whatsapp.module";
import ReminderModule from "@/modules/reminder.module";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import e from "express";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
    }),,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: "./upload",
          filename: function(req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
            console.log(uniqueSuffix);
            cb(null, file.fieldname + "-" + uniqueSuffix);
          }
        })
      })
    }),
    ScheduleModule.forRoot(),
    CacheModule.register(),
    UserModule, AuthModule, PatientModule, FoodModule, ProvinceModule,
    CategoryModule, PlanModule, EventModule, EvalModule, WhatsappModule, ReminderModule
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

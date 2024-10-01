import { NestFactory } from "@nestjs/core";
import SequelizeConnection from "@/database/sequelize.connection";
import { AppModule } from "@/app.module";
import { appConfig, authConfig } from "@/configs";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { version } from "../package.json";


if (appConfig.env === 'dev') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SequelizeConnection.getInstance();
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({
    validateCustomDecorators: true,
    stopAtFirstError: true,
    transform: true
  }));
  app.use(cookieParser(String(appConfig.key)));
  configSwagger(app);

  app.enableCors({
    allowedHeaders: '*',
    origin:'*'
  })

  await app.listen(Number(appConfig.port));
}

function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("JDoit Api")
    .setDescription("Sistema de gestión para nutricionistas")
    .setVersion(version)
    .addCookieAuth(authConfig.jwtCookieName)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/doc", app, document);

}

bootstrap();

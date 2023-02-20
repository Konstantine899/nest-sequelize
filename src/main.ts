import * as process from "process";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // Настройки Swagger
  const config = new DocumentBuilder()
    .setTitle("Урок по продвинутому BACKEND")
    .setDescription("Документация REST API")
    .addTag("Атрощенко Константин")
    .setVersion("1.0.0")
    .build();

  // Создаем объект самой документации Swagger
  const document = SwaggerModule.createDocument(app, config); // первый параметр instance приложения
  SwaggerModule.setup("/api/docs", app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();

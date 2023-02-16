import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [AppController],
  providers: [AppService], // переиспользуемые части кода которые могут быть использованы в других модулях
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "Konstantine899",
      password: "4343",
      database: "nest-course",
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}

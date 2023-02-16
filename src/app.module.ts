//src/app.module.ts
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";


@Module({
  imports: [ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }), SequelizeModule.forRoot({
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    models: [],
    autoLoadModels: true
  }), UsersModule],
  controllers: [],
  providers: []
})
export class AppModule {
}

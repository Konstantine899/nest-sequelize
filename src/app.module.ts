//src/app.module.ts
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { UserModel } from "./users/users.model";
import { RolesModule } from "./roles/roles.module";
import { RolesModel } from "./roles/roles.model";
import { UserRolesModel } from "./roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { PostsModel } from "./posts/posts.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"), // Для меня немного не понятно почему не выходим на верх, не входим в dist и в static
    }),
    // конфигурация подключения к БД должна быть последней
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      models: [UserModel, RolesModel, UserRolesModel, PostsModel], // добавляю модели в БД
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

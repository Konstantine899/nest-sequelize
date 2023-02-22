//src/users/users.module.ts
import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./users.model";
import { RolesModel } from "../roles/roles.model";
import { UserRolesModel } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { PostsModel } from "../posts/posts.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      RolesModel,
      UserRolesModel,
      PostsModel,
    ]),
    RolesModule, // это реально важно!! импортируем целый модуль
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}

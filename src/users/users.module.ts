//src/users/users.module.ts
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./users.model";
import { RolesModel } from "../roles/roles.model";
import { UserRolesModel } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([UserModel, RolesModel, UserRolesModel]),
    RolesModule, // это реально важно!! импортируем целый модуль
  ],
})
export class UsersModule {}

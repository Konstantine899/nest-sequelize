//src/roles/roles.module.ts
import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesModel } from "./roles.model";
import { UserModel } from "../users/users.model";
import { UserRolesModel } from "./user-roles.model";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([RolesModel, UserModel, UserRolesModel]),
  ],
  exports: [RolesService], // экспортирую из модуля все то что хочу использовать в других модулях
})
export class RolesModule {}

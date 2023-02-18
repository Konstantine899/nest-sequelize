//src/roles/roles.model.ts
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../users/users.model";
import { UserRolesModel } from "./user-roles.model";

interface RolesCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "roles" })
export class RolesModel extends Model<RolesModel, RolesCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "ADMIN",
    description: "Уникальное значение роли пользователя",
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: "Администратор",
    description: "Описание роли пользователя",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => UserModel, () => UserRolesModel)
  users: UserModel[];
}

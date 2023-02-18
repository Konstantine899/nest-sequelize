import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { RolesModel } from "./roles.model";
import { UserModel } from "../users/users.model";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export class UserRolesModel extends Model<UserRolesModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => RolesModel)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;
}

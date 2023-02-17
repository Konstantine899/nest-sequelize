//src/roles/roles.model.ts
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

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
}

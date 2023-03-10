//src/users/users.model.ts
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { RolesModel } from "../roles/roles.model";
import { UserRolesModel } from "../roles/user-roles.model";
import { PostsModel } from "../posts/posts.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "user@email.com", description: "Почтовый адрес" })
  @Column({
    type: DataType.STRING,
    unique: true, // email должен быть уникальным
    allowNull: false, // поле email не может быть пустым
  })
  email: string;

  @ApiProperty({ example: "123", description: "Пароль пользователя" })
  @Column({ type: DataType.STRING, unique: false }) // поле password не должно быть уникальным так как он может повторяться
  password: string;

  @ApiProperty({
    example: "true",
    description: "Заблокирован пользователь или нет",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean; // Будет отображать забанен пользователь или нет

  @ApiProperty({
    example: "За хулиганство",
    description: "Причина блокировки пользователя",
  })
  @Column({ type: DataType.STRING, allowNull: true }) // По умолчанию поле причины блокировки может быть пустым
  banReason: string; // отображает причину блокировки

  @BelongsToMany(() => RolesModel, () => UserRolesModel)
  roles: RolesModel[];

  // у одного пользователя может быть массив постов
  @HasMany(() => PostsModel)
  posts: PostsModel[];
}

//src/users/users.model.ts
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true, // email должен быть уникальным
    allowNull: false, // поле email не может быть пустым
  })
  email: string;

  @Column({ type: DataType.STRING, unique: false }) // поле password не должно быть уникальным так как он может повторяться
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean; // Будет отображать забанен пользователь или нет

  @Column({ type: DataType.BOOLEAN, allowNull: true }) // По умолчанию поле причины блокировки может быть пустым
  banReason: string; // отображает причину блокировки
}

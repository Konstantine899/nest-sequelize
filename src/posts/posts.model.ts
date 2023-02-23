// src/posts/posts.model.ts
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { UserModel } from "../users/users.model";

interface PostCreationAttr {
  title: string;
  context: string;
  userId: number;
  image: string; // название изображения
}

@Table({ tableName: "posts" })
export class PostsModel extends Model<PostsModel, PostCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  //Здесь будем хранить текстовое название картинки
  @Column({ type: DataType.STRING })
  image: string;

  // Перед описанием ассоциаций всегда создавай foreignKey
  // Указываю внешний ключ который будет ссылаться на пользователя в UserModel
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  // Описываю ассоциации
  @BelongsTo(() => UserModel)
  author: UserModel;
}

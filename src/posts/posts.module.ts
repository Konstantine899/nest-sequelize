//src/posts/posts.module.ts
import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "../users/users.model";
import { PostsModel } from "./posts.model";
import { FilesModule } from "../files/files.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([UserModel, PostsModel]), FilesModule],
})
export class PostsModule {}

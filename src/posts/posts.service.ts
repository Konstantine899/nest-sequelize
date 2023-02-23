import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { PostsModel } from "./posts.model";
import { FilesService } from "../files/files.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostsModel) private postRepository: typeof PostsModel,
    private fileService: FilesService
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    return await this.postRepository.create({ ...dto, image: fileName });
  }
}

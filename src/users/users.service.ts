import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("ADMIN"); // USER буду присваивать эту роль по умолчанию
    await user.$set("roles", [role.id]); // указываю что роль принадлежит пользователю
    user.roles = [role]; // добавляю поле roles в объект user со значением роли пользователя
    return user;
  }

  async getAllUser() {
    const users = await this.userRepository.findAll({ include: { all: true } }); // Будут подтягиваться все поля из других таблиц, с которыми у нас связан пользователь
    return users;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true }, // включая все поля, из других таблиц, связанные с пользователем
    });
  }
}

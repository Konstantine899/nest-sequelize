import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

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

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId); // получаю пользователя из БД
    const role = await this.roleService.getRoleByValue(dto.value); // получаю роль из БД
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException(
      "Пользователь или роль не найдены",
      HttpStatus.NOT_FOUND
    );
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId); // получаю пользователя из БД
    if (!user) {
      throw new HttpException(
        "Пользователь не найден",
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    user.banned = true;
    user.banReason = dto.bannedReason;
    await user.save(); // Сохраняю все в БД
    return user; // обратно возвращаю пользователя на клиент
  }
}

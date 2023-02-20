//src/users/dto/create-user.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "user@email.com", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Не корректный email" })
  readonly email: string;

  @ApiProperty({ example: "123", description: "Пароль пользователя" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "Не менее 4 и не более 16" })
  readonly password: string;
}

//src/users/dto/create-user.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "user@email.com", description: "Почтовый адрес" })
  readonly email: string;

  @ApiProperty({ example: "123", description: "Пароль пользователя" })
  readonly password: string;
}

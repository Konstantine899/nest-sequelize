//src/users/dto/add-role.dto.ts

import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @IsString({ message: "Должно быть строкой" })
  readonly value: string; // значение роли

  @IsNumber({}, { message: "Должно быть числом" })
  readonly userId: string; // шв пользователя которому мы эту роль будем добавлять
}

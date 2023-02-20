//src/users/dto/add-role.dto.ts

export class AddRoleDto {
  readonly value: string; // значение роли
  readonly userId: string; // шв пользователя которому мы эту роль будем добавлять
}

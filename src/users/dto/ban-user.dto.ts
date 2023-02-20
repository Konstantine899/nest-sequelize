//src/users/dto/ban-user.dto.ts

export class BanUserDto {
  readonly userId: string; // id заблокированного пользователя
  readonly bannedReason: string; // Причина по которой пользователь был заблокирован
}

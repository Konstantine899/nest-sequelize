//src/auth/roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  /* Что бы получить роли пользователя нужно внедрить класс Reflector*/
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // Метод getAllAndOverride используется для определения роли по умолчанию, или переопределение роли.
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [
          context.getHandler(), // Извлекает metadata из текущего обработчика маршрута
          context.getClass() /*Применяется для извлечения metadata на уровне контроллера. Применяя metadata ко всем маршрутам в классе контроллера*/,
        ]
      );

      /*Если роли не найдены, т.е. если по итогу вернулся null, то мы возвращаем true,
       и данный endpoint будет доступен всем пользователям*/
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest(); // получаем объект request из контекста
      const authHeader = req.headers.authorization; // вытаскиваем заголовок авторизации
      const bearer = authHeader.split(" ")[0]; // разбиваю строку и получаю первый объект в массиве
      const token = authHeader.split(" ")[1]; // разбиваю строку и получаю второй объект в массиве

      // если token не пришел с клиента
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }

      // если token пришел с клиента, то его необходимо раскодировать
      const user = this.jwtService.verify(token); // декодирую токен и проверяю подлинность пользователя путем верификации
      req.user = user; // если верификация прошла успешно помещаю раскодированные данные в объект req в только что созданное поле user
      console.log("USER", user);
      /*После того как мы token декодировали, мы обращаемся к ролям и с помощью функции some проверяю.
       * Если у пользователя такая роль, которая находиться в необходимых для этого endpoints ролях.
       * Если роль обнаружиться, функция some вернет true, и доступ к этому endpoint будет разрешен.
       * В обратном случае мы получим ошибку*/
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (error) {
      throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
    }
  }
}

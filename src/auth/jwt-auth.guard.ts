//src/auth/jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest(); // получаем объект request из контекста
    try {
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
      const user = this.jwtService.verify(token); // декодирую токен и получаю пользователя
      req.user = user; // помещаю раскодированные данные в объект req в только что созданное поле user
      return true; // Аутентификация пользователя пройдена успешно. Т.е. проверка подлинности пользователя
    } catch (error) {
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
  }
}

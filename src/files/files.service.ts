import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg"; // сгенерируем уникальное название для нашего файла
      const filePath = path.resolve(__dirname, "..", "static"); // получаю путь к нашему файлу
      /*Если по этому пути ничего не существует, то тогда нам необходимо создать директорию*/
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true }); // создаю директорию по указанному пути
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer); // записываю файл в файловую систему
      return fileName;
    } catch (error) {
      throw new HttpException(
        "Произошла ошибка при записи файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

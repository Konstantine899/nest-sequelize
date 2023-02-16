import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  controllers: [AppController],
  providers: [AppService], // переиспользуемые части кода которые могут быть использованы в других модулях
})
export class AppModule {}

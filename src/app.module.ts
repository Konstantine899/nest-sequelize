import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from "@nestjs/sequelize";


@Module({
  imports: [SequelizeModule.forRoot({
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "Konstantine899",
    password: "4343",
    database: "nest-course",
    models: [],
    autoLoadModels: true
  }),UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

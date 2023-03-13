import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.Entity';
import { UserModule } from './user/user.module';

const DB =  TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'u',
  entities: [User],
  synchronize: true,
})



@Module({
  imports: [DB, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

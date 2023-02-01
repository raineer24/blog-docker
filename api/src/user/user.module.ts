import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { UserService } from './user/service/user.service';
import { UserController } from './user/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/models/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController],
=======
import { UserController } from './controller/user.controller';
import { UserService } from './service/user-service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { UserHelperService } from './service/user-helper/user-helper.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserHelperService],
  exports: [UserService],
>>>>>>> 969748e (new url git repo)
})
export class UserModule {}

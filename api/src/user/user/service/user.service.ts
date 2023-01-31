import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, Like } from 'typeorm';
import { User } from '../models/user.interface';
import { Observable, from, throwError } from 'rxjs';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(user: User) {
    return from(this.userRepository.save(user));
  }

  findAll(): Observable<> {
    return from(this.userRepository.save(user));
  }

  deleteOne(): Observable<> {
    return from(this.userRepository.save(user));
  }

  updateOne(): Observable<> {
    return from(this.userRepository.save(user));
  }
}

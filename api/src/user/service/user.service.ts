import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, Like } from 'typeorm';
import { User } from '../models/user.interface';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  create(user: User) {
    return from(this.userRepository.save(user));
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOne({ id }));
  }
  findAll(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;

    return from(this.userRepository.update(id, user));
  }

  login(user: User): Observable<string> {
    return;
  }
  validateUser(email: string, password: string): Observable<User> {
    return this.findByMail(email).pipe(
      switchMap((user: User) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }
  findByMail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ email }));
  }
}

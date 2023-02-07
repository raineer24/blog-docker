import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(newUser: User): Promise<User> {
    try {
      const exists: boolean = await this.mailExists(newUser.email);
      console.log('exists', exists);
      if (!exists) {
        const passwordHash: string = await this.hashPassword(newUser.password);
        const foundUser: User = await this.findByEmail(
          newUser.email.toLowerCase(),
        );
        console.log('founduser', foundUser.email);
        newUser.password = passwordHash;
        newUser.role = foundUser.role;
        const user = await this.userRepository.save(
          this.userRepository.create(newUser),
        );
        return this.findOne(user.id);
      } else {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
    } catch {
      throw new HttpException('Email is already in use!', HttpStatus.CONFLICT);
    }
  }

  async login(user: User): Promise<string> {
    try {
      const foundUser: User = await this.findByEmail(user.email.toLowerCase());
      if (foundUser) {
        const matches: boolean = await this.validatePassword(
          user.password,
          foundUser.password,
        );
        if (matches) {
          const payload: User = await this.findOne(foundUser.id);
          console.log('payload', payload);
          return this.authService.generateJwt(payload);
        } else {
          throw new HttpException(
            'Login was not successfull, wrong credentials',
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          'Login was not successfull, wrong credentials',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  private async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne(
      { email },
      { select: ['id', 'email', 'username', 'password'] },
    );
  }

  private async hashPassword(password: string): Promise<string> {
    return this.authService.hashPassword(password);
  }

  private async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  find0ne(id: number): Observable<User> {
    return from(this.userRepository.findOne({ id })).pipe(
      map((user: User) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }
  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      }),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;

    return from(this.userRepository.update(id, user));
  }

  findByMail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ email }));
  }

  private async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}

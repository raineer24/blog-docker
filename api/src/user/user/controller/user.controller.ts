import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  create() {}

  findOne() {}

  findAll() {}

  deleteOne() {}

  updateOne() {}
}

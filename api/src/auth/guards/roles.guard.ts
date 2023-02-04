import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/service/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { map } from 'rxjs/operators';
import { hasRoles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor() {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PublicRoutingModule } from './public-routing.module';

import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UsersComponent } from './components/user/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    
  ]
})
export class PublicModule { }

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import {
  UserData,
  UserService,
} from '../../../../public/services/user-service/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: UserData = null;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role']
  pageEvent: PageEvent;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService.findAll(1, 10).pipe(
      tap((users) => console.log(users)),
      map((userData: UserData) => this.dataSource = userData)
      ).subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page +1;

    this.userService.findAll(page, size).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }
}

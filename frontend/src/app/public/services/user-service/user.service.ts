import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserI } from 'src/app/model/user.interface';

export interface UserData {
  items: UserI[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  findByUsername(username: string): Observable<UserI[]> {
    return this.http.get<UserI[]>(
      `api/users/find-by-username?username=${username}`
    );
  }

  create(user: UserI): Observable<UserI> {
    return this.http.post<UserI>('api/user', user).pipe(
      tap((createdUser: UserI) =>
        this.snackbar.open(
          `User ${createdUser.username} created successfully`,
          'Close',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        )
      ),
      catchError((e) => {
        this.snackbar.open(
          `User could not be created, due to: ${e.error.message}`,
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        return throwError(e);
      })
    );
  }

  findAll(page: number, size: number): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get('/api/user', { params }).pipe(
      map((userData: UserData) => userData),
      catchError((err) => throwError(err))
    );
  }
}

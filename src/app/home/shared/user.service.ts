import { HttpService } from '../../core/http.service';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  static END_POINT = '/usuarios';

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<User[]> {
    return this.httpService.get(UserService.END_POINT);
  }

  read(usuario: string): Observable<User> {
    return this.httpService.get(UserService.END_POINT + '/' + usuario).map(
      data => {
        return data;
      }
    );
  }

}

import { HttpService } from '../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService) {}

  login(username: string, password: string): Observable<any> {
    return this.httpService.login(username, password);
  }

  registerUser(username: string, password: string): Observable<boolean> {
    return this.httpService.registerUser(username, password);
  }
}



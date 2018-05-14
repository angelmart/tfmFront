import { HttpService } from '../../core/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PayService {

  static END_POINT = '/reservas';

  constructor(private httpService: HttpService) {}

  payReserve(idRoom: string): Observable<boolean> {
    return this.httpService.patch(PayService.END_POINT + '/' + idRoom);
  }
}



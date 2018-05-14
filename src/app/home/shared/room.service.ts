import { HttpService } from '../../core/http.service';
import { Room } from './room.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomService {

  static END_POINT = '/habitaciones';

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Room[]> {
    return this.httpService.get(RoomService.END_POINT);
  }

  read(id: string): Observable<Room> {
    return this.httpService.get(RoomService.END_POINT + '/' + id).map(
      data => {
        return data;
      }
    );
  }
}

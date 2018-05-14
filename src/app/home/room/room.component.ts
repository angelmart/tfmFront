import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Room} from '../shared/room.model';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login-dialog.component';
import { RoomService } from '../shared/room.service';
import {HttpService} from "../../core/http.service";

@Component({
  templateUrl: 'room.component.html',
  styleUrls: ['room.component.css']
})

export class RoomComponent implements OnDestroy {

  static URL = 'room';
  data: Room[];

  constructor(private router: Router, private roomService: RoomService, public loginDialog: MatDialog, private httpService: HttpService) {
    this.synchronize();
  }

  synchronize() {
    this.roomService.readAll().subscribe(data => this.data = data);
  }

  reservate(room: Room) {
    if (this.httpService.isAuthenticated()) {
      this.router.navigate(['home/reservas', room._id]);
    } else {
      const dialogRef = this.loginDialog.open(LoginComponent, {
        width: '250px',
        data : {'idRoom': room._id},
      });
    }
  }

  ngOnDestroy(): void {
  }
}

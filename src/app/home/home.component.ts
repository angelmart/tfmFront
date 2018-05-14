import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login-dialog.component';
import { RoomComponent } from './room/room.component';
import { HttpService } from '../core/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnDestroy {

  static URL = 'home';
  constructor(public loginDialog: MatDialog, private router: Router, private httpService: HttpService) {
  }

  ngOnDestroy(): void {
  }

  login(): void {
    const dialogRef = this.loginDialog.open(LoginComponent, {
      width: '250px'
    });
  }

  home() {
    this.router.navigate([HomeComponent.URL, RoomComponent.URL]);
  }

  isAuthenticated(): boolean {
    return this.httpService.isAuthenticated();
  }

  getLoginUsuario(): string {
    return this.httpService.getUsuario();
  }
}

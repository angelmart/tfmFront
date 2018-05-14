import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ReserveComponent } from './home/reserve/reserve.component';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './home/room/room.component';
import { LoginComponent } from './home/login-dialog.component';
import {PayComponent} from './home/reserve/pay-dialog.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: HomeComponent.URL + '/' + RoomComponent.URL },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: ReserveComponent.URL, component: ReserveComponent },
      { path: RoomComponent.URL, component: RoomComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static COMPONENTS = [
    HomeComponent, ReserveComponent, RoomComponent, LoginComponent, PayComponent
  ];

  static DIALOGS_COMPONENTS = [
    HomeComponent, LoginComponent, PayComponent
  ];
}

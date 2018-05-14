import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PayComponent } from './pay-dialog.component';
import { Reserve } from '../shared/reserve.model';
import { RoomService } from '../shared/room.service';
import { ReserveService } from '../shared/reserve.service';
import { Room } from '../shared/room.model';
import { RoomType } from '../shared/roomType.model';
import { User } from '../shared/user.model';
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../../core/http.service";
import { LoginComponent } from "../login-dialog.component";

@Component({
  templateUrl: 'reserve.component.html',
  styleUrls: ['reserve.component.css']
})

export class ReserveComponent implements OnInit {

  static URL = 'reservas/:id';
  roomId: string;
  room: Room;
  usuario: User;
  reservas: Reserve[];
  reserva: Reserve;
  title = 'Reservas existentes';
  columns = ['fechaEntrada', 'fechaSalida'];
  dateEntrada: Date;
  dateSalida: Date;
  settings = {
    bigBanner: true, timePicker: true, format: 'dd-MM-yyyy hh:mm', defaultOpen: false
  };

  hours = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
    { value: 11 },
    { value: 12 },
  ];
  totalHoras: number;

  constructor(public loginDialog: MatDialog, public payDialog: MatDialog, private snackBar: MatSnackBar,
    private reserveService: ReserveService, private roomService: RoomService, private route: ActivatedRoute, private httpService: HttpService) {

    this.route.params.subscribe(params => this.roomId = params['id']);
    this.room = { imagen: '', tipoHabitacion: RoomType.INDIVIDUAL };
    this.dateEntrada = new Date();
    this.totalHoras = 1;
    this.usuario = { usuario: 'pepito', password: '2', email: 'safsdf@gmail.com' };
  }

  ngOnInit(): void {
    this.synchronize();
  }

  synchronize() {
    this.roomService.read(this.roomId).subscribe(data => {
      this.room = data;
      this.reserveService.readAll().subscribe(reserveData => {
        this.reservasHabitacion(reserveData);
      });
    });
  }

  reservasHabitacion(data: Reserve[]) {
    this.reservas = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].habitacion._id === this.room._id) {
        this.reservas.push(data[i]);
      }
    }
  }

  formatDate(fecha: Date): string {
    const fechaReserva = new Date(fecha);
    return fechaReserva.getDate().toString() + '/' + (fechaReserva.getMonth() + 1).toString() + '/' +
      fechaReserva.getFullYear().toString() + ', ' + fechaReserva.toLocaleTimeString();
  }

  createReserva(): void {
    this.reserveService.create(this.reserva).subscribe(data => {
      this.reserva = data;
      this.synchronize();
      this.snackBar.open('Reserva realizada !', 'Info', {
        duration: 8000
      });
      const dialogRef = this.payDialog.open(PayComponent, {
        data: { 'idReserva': this.reserva._id, 'precioReserva': this.reserva.precio },
      });
    });
  }

  calculateDateSalida(): void {
    this.dateSalida = new Date(this.dateEntrada);
    if ((this.dateSalida.getHours() + this.totalHoras) <= 24) {
      this.dateSalida.setHours(this.dateSalida.getHours() + this.totalHoras);
    } else {
      this.dateSalida.setDate(this.dateSalida.getDate() + 1);
      const hDiaAnterior = 24 - this.dateSalida.getHours();
      const hDiaSiguiente = this.totalHoras - hDiaAnterior;
      this.dateSalida.setHours(hDiaSiguiente);
    }
  }

  confirmarReserva(): void {
    this.calculateDateSalida();
    this.reserva = {
      fechaEntrada: this.dateEntrada,
      fechaSalida: this.dateSalida,
      precio: this.room.precioHora * this.totalHoras,
      abonada: false,
      habitacion: this.room,
    };
    if (this.httpService.isAuthenticated()) {
      if (this.validate(this.reserva)) {
        this.createReserva();
      } else {
        this.snackBar.open('La habitación no está disponible en esa fecha. Consulte las reservas de la habitación en el listado.', 'Error', {
          duration: 8000
        });
      }
    } else {
      this.snackBar.open('Antes de reservar, inicia sesión o indica tu email y contraseña para registrarte automaticamente.', 'Info', {
        duration: 8000
      });
      const dialogRef = this.loginDialog.open(LoginComponent, {
        width: '250px',
        data: { 'idRoom': this.roomId },
      });
    }
  }

  validate(reserva: Reserve): boolean {
    for (let i = 0; i < this.reservas.length; i++) {
      const fechaEntradaReservas = new Date(Date.parse(this.reservas[i].fechaEntrada.toString()));
      const fechaSalidaReservas = new Date(Date.parse(this.reservas[i].fechaSalida.toString()));
      fechaSalidaReservas.setHours( fechaSalidaReservas.getHours() + 2 );
      const fechaEntradaReserva = new Date(this.reserva.fechaEntrada);
      const fechaSalidaReserva = new Date(this.reserva.fechaSalida);
      if (fechaEntradaReserva >= fechaEntradaReservas && fechaEntradaReserva < fechaSalidaReservas) {
        return false;
      }
      if (fechaEntradaReserva < fechaEntradaReservas && fechaSalidaReserva > fechaEntradaReservas) {
        return false;
      }
    }
    return true;
  }
}


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './shared/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialog-login',
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['login-dialog.component.css']
})

export class LoginComponent {

  usuario: string = 'diego69';
  password: string = 'diego69';
  passwordFormControl: FormControl;
  userFormControl: FormControl;

  loginForm: FormGroup = new FormGroup({
    usuario: this.userFormControl = new FormControl('', [Validators.required]),
    password: this.passwordFormControl = new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private loginService: LoginService, public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  login() {
    this.loginService.login(this.usuario, this.password).subscribe(
      exito => {
        if (exito) {
          if (this.data != null) {
            this.router.navigate(['home/reservas', this.data.idRoom]);
          }
        } else {
          this.loginService.registerUser(this.usuario, this.password).subscribe(
            res => {
              if (res) {
                this.loginService.login(this.usuario, this.password).subscribe(
                  exito2 => {
                    if (exito2) {
                      if (this.data != null) {
                        this.router.navigate(['home/reservas', this.data.idRoom]);
                      }
                      this.showRegisterUserAlert();
                    } else {
                      this.showErrorAuthentication();
                    }
                  });
              } else {
                this.showErrorServer();
              }
            });
        }
      }
    );
  }

  showRegisterUserAlert(): void {
    this.snackBar.open(`Cuenta de usuario creada automaticamente para "${this.usuario}"`, 'Info', {
      duration: 8000
    });
  }

  showErrorAuthentication(): void {
    this.snackBar.open("Autenticacion fallida", 'Error', {
      duration: 8000
    });
  }

  showErrorServer(): void {
    this.snackBar.open("Error de conexion con el servidor", 'Error', {
      duration: 8000
    });
  }
}

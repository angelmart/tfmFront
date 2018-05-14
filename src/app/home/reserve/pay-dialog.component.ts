import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PayService } from "../shared/pay-dialog.service";

@Component({
  templateUrl: 'pay-dialog.component.html',
  styleUrls: ['pay-dialog.component.css']
})

export class PayComponent {
  email: string;
  password: string;
  passwordFormControl: FormControl;
  emailFormControl: FormControl;

  payPalForm: FormGroup = new FormGroup({
    email: this.emailFormControl = new FormControl('', [Validators.email, Validators.required]),
    password: this.passwordFormControl = new FormControl('', [Validators.required])
  });

  constructor(
    private snackBar: MatSnackBar, public dialogRef: MatDialogRef<PayComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private payService: PayService) {
  }

  pagar() {
    this.payService.payReserve(this.data.idReserva).subscribe(
      res => {
        if (res) {
          this.showMessage('Pago de reserva realizado con exito !', 'Info');
        } else {
          this.showMessage('Error al procesar el pago', 'Error');
        }
      });
  }

  showMessage(message: string, typeMessage: string) {
    this.snackBar.open(message, typeMessage, {
      duration: 8000
    });
  }
}

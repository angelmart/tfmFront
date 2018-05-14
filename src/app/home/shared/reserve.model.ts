import { Room } from './room.model';
import { User } from './user.model';

export interface Reserve {
    _id?: string;
    fechaEntrada: Date;
    fechaSalida: Date;
    precio: number;
    abonada: boolean;
    usuario?: User;
    habitacion?: Room;
}

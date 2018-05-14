import { RoomType } from './roomType.model';

export interface Room {
  _id?: string;
  servicios?: [String];
  precioHora?: number;
  imagen: string;
  tipoHabitacion?: RoomType;
}

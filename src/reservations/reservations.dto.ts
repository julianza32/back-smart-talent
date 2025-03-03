import { Guests } from 'src/guests/guests.entity';
import { EmergencyContact } from './reservations.entity';

export interface IReservationsDto {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: Guests[];
  emergencyContact: EmergencyContact;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
}

export interface IReservationsDetailDto {
  checkIn: string;
  checkOut: string;
  guests: Guests[];
  name_hotel: string;
  number_room: number;
  id_room: string;
  emergencyContact: EmergencyContact;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
}
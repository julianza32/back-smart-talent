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
  status: 'confirmed' | 'pending' | 'canceled';
}

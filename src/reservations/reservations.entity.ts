import { CosmosPartitionKey } from '@nestjs/azure-database';
import { Guests } from 'src/guests/guests.entity';
import { Hotels } from 'src/hotels/hotels.entity';
import { Rooms } from 'src/rooms/rooms.entity';

@CosmosPartitionKey('id')
export class Reservations {
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

export class EmergencyContact {
  name: string;
  phone: string;
}


export interface ReservationsDetail {
  id: string;
  checkIn: string;
  checkOut: string;
  guests: Guests[];
  name_hotel: string;
  number_room: number;
  emergencyContact: EmergencyContact;
  id_room: string;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
}
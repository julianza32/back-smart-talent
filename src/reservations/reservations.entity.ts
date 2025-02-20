import { CosmosPartitionKey } from "@nestjs/azure-database";
import { Guests } from "src/guests/guests.entity";

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
  status: 'confirmed' | 'pending' | 'canceled';
}


export class EmergencyContact {
  name: string;
  phone: string;
}
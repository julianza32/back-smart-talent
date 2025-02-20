import { InjectModel } from '@nestjs/azure-database';
import { Injectable } from '@nestjs/common';
import { Reservations } from './reservations.entity';
import { Container } from '@azure/cosmos';
import { IReservationsDto } from './reservations.dto';

@Injectable()
export class ReservationsService {

    constructor(@InjectModel(Reservations) private readonly reservationContainer: Container ) {}

    async getAllReservations(): Promise<IReservationsDto[]> {
        const querySql = 'SELECT * FROM c';
        const { resources } = await this.reservationContainer.items
        .query<Reservations>(querySql)
        .fetchAll();

        return resources.map(reservation => ({
            id: reservation.id,
            userId: reservation.userId,
              hotelId: reservation.hotelId,
              roomId: reservation.roomId,
              checkIn: reservation.checkIn, 
              checkOut: reservation.checkOut, 
              guests: reservation.guests,
              emergencyContact: reservation.emergencyContact,
              status: reservation.status
        }));
    }
}

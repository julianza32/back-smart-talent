import { InjectModel } from '@nestjs/azure-database';
import { Injectable } from '@nestjs/common';
import { Reservations } from './reservations.entity';
import { Container } from '@azure/cosmos';
import { IReservationsDto } from './reservations.dto';
import e from 'express';
import { Guests } from 'src/guests/guests.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservations) private readonly reservationContainer: Container,
  ) {}

  async createReservation(
    reservationData: IReservationsDto,
  ): Promise<Reservations | null> {
    const { id, ...restReservationData } = reservationData;

    try {
      let reservation = new Reservations();
      reservation.id = id;
      const newReservation = { ...reservation, ...restReservationData };

      const { resource } =
        await this.reservationContainer.items.create(newReservation);
      return {
        id: resource!.id,
        userId: resource!.userId,
        hotelId: resource!.hotelId,
        roomId: resource!.roomId,
        checkIn: resource!.checkIn,
        checkOut: resource!.checkOut,
        guests: resource!.guests,
        emergencyContact: resource!.emergencyContact,
        status: resource!.status,
      };
    } catch (error) {
      return null;
    }
  }

  async updateReservation(
    id: string,
    reservationData: IReservationsDto,
  ): Promise<IReservationsDto | null> {
    const { resource: existReservation } = await this.reservationContainer
      .item(id, id)
      .read();

    if (!existReservation) throw new Error('Reservation not found');

    const reservationUpdated = { ...existReservation, ...reservationData };
    const { resource } = await this.reservationContainer
      .item(id, id)
      .replace(reservationUpdated);

    return {
      id: resource!.id,
      userId: resource!.userId,
      hotelId: resource!.hotelId,
      roomId: resource!.roomId,
      checkIn: resource!.checkIn,
      checkOut: resource!.checkOut,
      guests: resource!.guests,
      emergencyContact: resource!.emergencyContact,
      status: resource!.status,
    };
  }


  async getReservationById(
    reservationId: string,
  ): Promise<IReservationsDto | null> {
    const { resource } = await this.reservationContainer
      .item(reservationId, reservationId)
      .read();
    if (!resource) return null;

    return {
      id: resource.id,
      userId: resource.userId,
      hotelId: resource.hotelId,
      roomId: resource.roomId,
      checkIn: resource.checkIn,
      checkOut: resource.checkOut,
      guests: resource.guests,
      emergencyContact: resource.emergencyContact,
      status: resource.status,
    };
  }

  getReservationsByUserId(userId: string): Promise<IReservationsDto[]> {
    const querySql = 'SELECT * FROM c WHERE c.userId = @userId',
      parameters = [{ name: '@userId', value: userId }];

    return this.reservationContainer.items
      .query<Reservations>({ query: querySql, parameters: parameters })
      .fetchAll()
      .then(({ resources }) =>
        resources.map((reservation) => ({
          id: reservation.id,
          userId: reservation.userId,
          hotelId: reservation.hotelId,
          roomId: reservation.roomId,
          checkIn: reservation.checkIn,
          checkOut: reservation.checkOut,
          guests: reservation.guests,
          emergencyContact: reservation.emergencyContact,
          status: reservation.status,
        })),
      );
  }

  async getReservationsByHotelId(hotelId: string): Promise<IReservationsDto[]> {
    const querySql = 'SELECT * FROM c WHERE c.hotelId = @hotelId';
    const { resources } = await this.reservationContainer.items
      .query<Reservations>({
        query: querySql,
        parameters: [{ name: '@hotelId', value: hotelId }],
      })
      .fetchAll();

    return resources.map((reservation) => ({
      id: reservation.id,
      userId: reservation.userId,
      hotelId: reservation.hotelId,
      roomId: reservation.roomId,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      guests: reservation.guests,
      emergencyContact: reservation.emergencyContact,
      status: reservation.status,
    }));
  }

  async getAllReservations(): Promise<IReservationsDto[]> {
    const querySql = 'SELECT * FROM c';
    const { resources } = await this.reservationContainer.items
      .query<Reservations>(querySql)
      .fetchAll();

    return resources.map((reservation) => ({
      id: reservation.id,
      userId: reservation.userId,
      hotelId: reservation.hotelId,
      roomId: reservation.roomId,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      guests: reservation.guests,
      emergencyContact: reservation.emergencyContact,
      status: reservation.status,
    }));
  }

  async addGuestToReservation(id: string, listGuest: Guests[]) {
    const { resource: existReservation } = await this.reservationContainer
      .item(id, id)
      .read();

    if (!existReservation) throw new Error('Reservation not found');

    const reservationUpdated = { ...existReservation, guests: listGuest };
    const { resource } = await this.reservationContainer
      .item(id, id)
      .replace(reservationUpdated);
    return {
      guests: resource!.guests,
    }
  }
  async changeStatusReservation(id: string, status: string) {
    const { resource } = await this.reservationContainer
      .item(id, id)
      .patch([{ op: 'set', path: '/status', value: status }]);

    if (!resource) throw new Error('Reservation not found');

    return {
      id: resource.id,
      userId: resource.userId,
      hotelId: resource.hotelId,
      roomId: resource.roomId,
      checkIn: resource.checkIn,
      checkOut: resource.checkOut,
      guests: resource.guests,
      emergencyContact: resource.emergencyContact,
      status: resource.status
    };
  }
}

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { IReservationsDto } from './reservations.dto';
import { Guests } from 'src/guests/guests.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('all')//
  async getReservations() {
    return this.reservationsService.getAllReservations();
  }
  @Get(':id')//
  async getReservationById(@Param('id') id: string) {
    return this.reservationsService.getReservationById(id);
  }
  @Get('by-user/:id')//
  async getReservationsByUser(@Param('id') id: string) {
    return this.reservationsService.getReservationsByUserId(id);
  }
  @Get('by-hotel/:id')//
  async getReservationsByHotel(@Param('id') id: string) {
    return this.reservationsService.getReservationsByHotelId(id);
  }
  @Post('create')//
  async createReservation(@Body() reservationData: IReservationsDto) {
    return this.reservationsService.createReservation(reservationData);
  }
  @Put('update/:id')//
  async updateReservation(
    @Param('id') id: string,
    @Body() reservationData: IReservationsDto,
  ) {
    return this.reservationsService.updateReservation(id, reservationData);
  }

  @Post('add-guest-reservation/:id')//
    async addGuestToReservation(
        @Param('id') id: string,
        @Body() guest: Guests[],
    ) {
        return this.reservationsService.addGuestToReservation(id, guest);
    }

  @Put('change-status/:id/:status') //
  async changeStatus(
    @Param('id') id: string,
    @Param('status') status: string,
  ) {
    return this.reservationsService.changeStatusReservation(id, status);
  } 
}

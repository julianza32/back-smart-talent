import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { IRoomsDto } from './rooms.dto';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Get('all')//
    async getRooms(): Promise<IRoomsDto[]> {
        return this.roomsService.getRooms();
    }
    @Post('create')//
    async createRoom(@Body() roomData: IRoomsDto): Promise<IRoomsDto | null> {
        return this.roomsService.createRoom(roomData);
    }
    @Put('update/:id')//
    async updateRoom(@Param('id') id: string, @Body() roomData: IRoomsDto): Promise<IRoomsDto | null> {
        return this.roomsService.updateRoom(id, roomData);
    }

    @Delete('delete/:id')//
    async deleteRoom(@Param('id') id: string): Promise<boolean> {
        return this.roomsService.deleteRoom(id);
    }

    @Get('get/:id')//
    async getRoom(@Param('id') id: string): Promise<IRoomsDto | null> {
        return this.roomsService.getRoomById(id);
    }

    @Get('get-by-hotel/enabled/:id')//
    async getRoomsByHotelEnabled(@Param('id') id: string): Promise<IRoomsDto[]> {
        return this.roomsService.getRoomsByHotelIdEnabled(id);
    }
    @Get('get-by-hotel/:id')//
    async getRoomsByHotel(@Param('id') id: string): Promise<IRoomsDto[]> {
        return this.roomsService.getRoomsByHotelId(id);
    }

    @Get('get-by-type/:type')//
    async getRoomsByType(@Param('type') type: string): Promise<IRoomsDto[]> {
        return this.roomsService.getRoomsByType(type);
    }
    @Get('get-by-status/:status')//
    async getRoomsByStatus(@Param('status') status: string): Promise<IRoomsDto[]> {
        return this.roomsService.getRoomsByStatus(status);
    }
    @Post('toggle-status/:id/:status')//
    async toggleRoomStatus(@Param('id') id: string, @Param('status') status: string): Promise<IRoomsDto | null> {
        return this.roomsService.toggleRoomStatus(id, status);
    }
}

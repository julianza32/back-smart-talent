import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { IRoomsDto } from './rooms.dto';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Get('all')
    async getRooms(): Promise<IRoomsDto[]> {
        return this.roomsService.getRooms();
    }
}

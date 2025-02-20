import { Controller, Get } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { IGuestsDto } from './guests.dto';

@Controller('guests')
export class GuestsController {
    constructor(private readonly guestService :GuestsService) {}

    @Get('all')
    async getGuests(): Promise<IGuestsDto[]> {
        return this.guestService.getAllGuests();
    }
}


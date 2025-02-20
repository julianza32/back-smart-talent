import { Controller, Get } from '@nestjs/common';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {

    constructor(private readonly serviceHotels : HotelsService){}

    @Get('all')
    async getHotels(){
        return this.serviceHotels.getHotels();
    }
}

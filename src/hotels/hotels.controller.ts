import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { IHotelsDto } from './hotels.dto';

@Controller('hotels')
export class HotelsController {

    constructor(private readonly serviceHotels : HotelsService){}

    @Get('all')//
    async getHotels(){
        return this.serviceHotels.getHotels();
    }

    @Get(':id')//
    async getHotelById(@Param('id') id: string){
        return this.serviceHotels.getHotelById(id);
    }
    
    @Post('create') //
    async createHotel(@Body() hotelData: IHotelsDto){
        return this.serviceHotels.createHotel(hotelData);
    }

    @Delete('delete/:id')//
    async deleteHotel(@Param('id') id: string){
        return this.serviceHotels.deleteHotel(id);
    }

    @Put('update/:id')//
    async updateHotel(@Param('id') id :string,  @Body() hotelData: IHotelsDto){
        return this.serviceHotels.updateHotel(id, hotelData);
    }

    @Put('activate/:id/:is_active')//
    async activateHotel(@Param('id') id: string, @Param('is_active') is_active: string){
        return this.serviceHotels.toggleHotelStatus(id,is_active);
    }
    
    

}

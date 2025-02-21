import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GuestsService } from './guests.service';
import { IGuestsDto } from './guests.dto';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestService: GuestsService) {}

  @Get('all')
  async getGuests(): Promise<IGuestsDto[]> {
    return this.guestService.getAllGuests();
  }

  @Get(':id')
  async getGuestById(@Param('id') id: string): Promise<IGuestsDto> {
    return this.guestService.getGuestById(id);
  }
  @Put('update/:id')
  async updateGuest(
    @Param('id') id: string,
    @Body() guestData: IGuestsDto,
  ): Promise<IGuestsDto> {
    return this.guestService.updateGuest(id, guestData);
  }
  @Post('create')
  async createGuest(@Body() guestData: IGuestsDto): Promise<IGuestsDto> {
    return this.guestService.createGuest(guestData);
  }
  @Delete('delete/:id')
  async deleteGuest(@Param('id') id: string): Promise<boolean> {
    return this.guestService.deleteGuest(id);
  }
}

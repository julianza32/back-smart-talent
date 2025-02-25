import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Reservations } from './reservations.entity';
import { Hotels } from 'src/hotels/hotels.entity';
import { HotelsService } from 'src/hotels/hotels.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { HotelsModule } from 'src/hotels/hotels.module';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  providers: [ReservationsService],
  controllers: [ReservationsController],
    exports: [ReservationsService],
    imports: [
        HotelsModule,
        RoomsModule,
        AzureCosmosDbModule.forFeature([
            {
                collection: 'reservations',
                dto: Reservations
            },
            {
                collection: 'hotels',
                dto: Hotels
            }
            ,
            {
                collection: 'rooms',
                dto: Hotels
            }
        ])
    ]

})
export class ReservationsModule {}

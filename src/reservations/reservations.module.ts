import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Reservations } from './reservations.entity';

@Module({
  providers: [ReservationsService],
  controllers: [ReservationsController],
    exports: [ReservationsService],
    imports: [
        AzureCosmosDbModule.forFeature([
            {
                collection: 'reservations',
                dto: Reservations
            }
        ])
    ]

})
export class ReservationsModule {}

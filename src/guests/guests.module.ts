import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import { Guests } from './guests.entity';
import { AzureCosmosDbModule } from '@nestjs/azure-database';

@Module({
  controllers: [GuestsController],
  providers: [GuestsService],
  exports: [GuestsService],
  imports: [
    AzureCosmosDbModule.forFeature([
      {
        collection: 'guests',
        dto: Guests
      }
    ])
  ]

})
export class GuestsModule {}

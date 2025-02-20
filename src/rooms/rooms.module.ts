import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Rooms } from './rooms.entity';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [
    AzureCosmosDbModule.forFeature([
      {
        collection: 'rooms',
        dto: Rooms
      }
    ])
  ]

})
export class RoomsModule {}

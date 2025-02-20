import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Hotels } from './hotels.entity';

@Module({
    imports:[
        AzureCosmosDbModule.forFeature([
            {
                collection: 'hotels',
                dto: Hotels
            }
        ])
    ],
  providers: [HotelsService],
  controllers: [HotelsController],
  exports: [HotelsService]
})
export class HotelsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { GuestsModule } from './guests/guests.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [AzureCosmosDbModule.forRoot({
    dbName: process.env.DB_NAME??'',
    endpoint: process.env.END_POINT??'',
    key: process.env.KEY??'',
  }), UsersModule, ReservationsModule, RoomsModule, GuestsModule, HotelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

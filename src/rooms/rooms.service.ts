import { Injectable } from '@nestjs/common';
import { Rooms } from './rooms.entity';
import { Container } from '@azure/cosmos';
import { InjectModel } from '@nestjs/azure-database';
import { IRoomsDto } from './rooms.dto';

@Injectable()
export class RoomsService {

    constructor(@InjectModel(Rooms) private readonly roomsContainer: Container){}

    async getRooms(): Promise<IRoomsDto[]>{
    const querySql = 'SELECT * FROM c';
    const { resources } = await this.roomsContainer.items
        .query<Rooms>(querySql)
        .fetchAll();

    return resources.map(room => ({
            id: room.id,
            type: room.type,
            base_cost: room.base_cost,
            taxes: room.taxes,
            location: room.location,
            status: room.status    
        }));
    }
}

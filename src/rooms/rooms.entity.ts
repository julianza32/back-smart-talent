import { CosmosPartitionKey } from "@nestjs/azure-database";

@CosmosPartitionKey('id')

export class Rooms {
        id: string;
        type: TypeRooms;
        base_cost: number;
        taxes: number;
        location: string;
        status: StatusRooms;
        id_hotel: string;
        number_room: number;
}
export class TypeRooms {
    enum: ['Sencilla', 'Doble', 'Triple']
}
export class StatusRooms {
    enum: ['Habilitada','Deshabilitada'];
}
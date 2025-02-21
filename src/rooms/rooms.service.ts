import { Injectable } from '@nestjs/common';
import { Rooms } from './rooms.entity';
import { Container } from '@azure/cosmos';
import { InjectModel } from '@nestjs/azure-database';
import { IRoomsDto } from './rooms.dto';
import { v4 as uuidv4 } from 'uuid'; 

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
            status: room.status,    
            id_hotel: room.id_hotel,
            number_room: room.number_room
        }));
    }

    async createRoom(roomData: IRoomsDto): Promise<Rooms | null> {
        const { id, ...restRoomData } = roomData;

        try {
            let room = new Rooms();
            room.id = uuidv4();
            const newRoom = { ...room, ...restRoomData };

            const { resource } = await this.roomsContainer.items.create(newRoom);
            return {
                id: resource!.id,
                type: resource!.type,
                base_cost: resource!.base_cost,
                taxes: resource!.taxes,
                location: resource!.location,
                status: resource!.status,
                id_hotel: resource!.id_hotel,
                number_room: resource!.number_room
            };
        } catch (error) {
            return null;
        }
    }

    async updateRoom(id: string, roomData: IRoomsDto): Promise<IRoomsDto | null> {
        const { resource: existRoom } = await this.roomsContainer.item(id, id).read();

        if (!existRoom) throw new Error('Room not found');

        const roomUpdated = { ...existRoom, ...roomData };
        const { resource: updatedResource } = await this.roomsContainer.item(id, id).replace(roomUpdated);

        return {
            id: updatedResource!.id,
            type: updatedResource!.type,
            base_cost: updatedResource!.base_cost,
            taxes: updatedResource!.taxes,
            location: updatedResource!.location,
            status: updatedResource!.status,
            id_hotel: updatedResource!.id_hotel,
            number_room: updatedResource!.number_room

        };
    }


    async deleteRoom(id: string): Promise<boolean> {
        const { resource } = await this.roomsContainer.item(id, id).delete();
        return !resource;
    }

    async getRoomById(roomId: string): Promise<IRoomsDto | null> {
        const { resource } = await this.roomsContainer.item(roomId, roomId).read();
        if (!resource) return null;
        return {
            id: resource.id,
            type: resource.type,
            base_cost: resource.base_cost,
            taxes: resource.taxes,
            location: resource.location,
            status: resource.status,
            id_hotel: resource.id_hotel,
            number_room: resource.number_room
        };
    }

    async getRoomsByHotelId(hotelId: string): Promise<IRoomsDto[]> {
        const querySql = 'SELECT * FROM c WHERE c.id_hotel = @hotelId';
        const { resources } = await this.roomsContainer.items
            .query<Rooms>({ query: querySql, parameters: [{ name: '@hotelId', value: hotelId }] })
            .fetchAll();

        return resources.map(room => ({
            id: room.id,
            type: room.type,
            base_cost: room.base_cost,
            taxes: room.taxes,
            location: room.location,
            status: room.status,
            id_hotel: room.id_hotel,
            number_room: room.number_room
        }));
    }
    async getRoomsByType(type: string): Promise<IRoomsDto[]> {
        const querySql = 'SELECT * FROM c WHERE c.type = @type';
        const { resources } = await this.roomsContainer.items
            .query<Rooms>({ query: querySql, parameters: [{ name: '@type', value: type }] })
            .fetchAll();

        return resources.map(room => ({
            id: room.id,
            type: room.type,
            base_cost: room.base_cost,
            taxes: room.taxes,
            location: room.location,
            status: room.status,
            id_hotel: room.id_hotel,
            number_room: room.number_room
        }));
    }

    async getRoomsByStatus(status: string): Promise<IRoomsDto[]> {
        const querySql = 'SELECT * FROM c WHERE c.status = @status';
        const { resources } = await this.roomsContainer.items
            .query<Rooms>({ query: querySql, parameters: [{ name: '@status', value: status }] })
            .fetchAll();

        return resources.map(room => ({
            id: room.id,
            type: room.type,
            base_cost: room.base_cost,
            taxes: room.taxes,
            location: room.location,
            status: room.status,
            id_hotel: room.id_hotel,
            number_room: room.number_room
        }));
    }
}

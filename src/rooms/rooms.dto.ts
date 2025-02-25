import { StatusRooms, TypeRooms } from "./rooms.entity";

export interface IRoomsDto {
    id: string;
    type: TypeRooms;
    base_cost: number;
    taxes: number;
    location: string;
    status: StatusRooms;
    id_hotel: string;
    details: string;
    number_room: number;
}

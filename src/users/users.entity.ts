import { CosmosPartitionKey } from "@nestjs/azure-database";

@CosmosPartitionKey('id')

export class Users {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    phone: string;
    type: typeUser;
    create_at: Date;
}
export class typeUser{
    enum: ['Agente', 'Viajero']
}
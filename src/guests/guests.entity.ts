import { CosmosPartitionKey } from "@nestjs/azure-database";

@CosmosPartitionKey('id')   
export class Guests {
    id: string;
    name: string;
    birthDate: string; 
    documentType: string; 
    documentNumber: string;
    email: string;
    phone: string;
}

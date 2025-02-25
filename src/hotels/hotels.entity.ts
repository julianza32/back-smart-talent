import { CosmosPartitionKey } from "@nestjs/azure-database";

@CosmosPartitionKey('id')   
export class Hotels {
    id: string;
    name: string;
    location: string;
    is_active: boolean;
    created_by: string; 
    details: string;
}

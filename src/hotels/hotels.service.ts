import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/azure-database';
import { Hotels } from './hotels.entity';
import { Container } from '@azure/cosmos';
import { IHotelsDto } from './hotels.dto';

@Injectable()
export class HotelsService {
    constructor(@InjectModel(Hotels)  private readonly hotelsContainer: Container ){}



async getHotels(): Promise<IHotelsDto[]>{
const querySql = 'SELECT * FROM c';
const { resources } = await this.hotelsContainer.items
    .query<Hotels>(querySql)
    .fetchAll();
    return resources.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        location: hotel.location,
        is_active: hotel.is_active,
        created_by: hotel.created_by,
    }));
}}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/azure-database';
import { Hotels } from './hotels.entity';
import { Container } from '@azure/cosmos';
import { IHotelsDto } from './hotels.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotels) private readonly hotelsContainer: Container,
  ) {}

  async getHotels(): Promise<IHotelsDto[]> {
    const querySql = 'SELECT * FROM c';
    const { resources } = await this.hotelsContainer.items
      .query<Hotels>(querySql)
      .fetchAll();
    return resources.map((hotel) => ({
      id: hotel.id,
      name: hotel.name,
      location: hotel.location,
      is_active: hotel.is_active,
      created_by: hotel.created_by,
    }));
  }

  async createHotel(hotelData: IHotelsDto): Promise<Hotels | null> {
    const { id, ...restHotelData } = hotelData;

    try {
      let hotel = new Hotels();
      hotel.id = uuidv4();
      const newHotel = { ...hotel, ...restHotelData };

      const { resource } = await this.hotelsContainer.items.create(newHotel);
      return {
        id: resource!.id,
        name: resource!.name,
        location: resource!.location,
        is_active: resource!.is_active,
        created_by: resource!.created_by,
      };
    } catch (error) {
      return null;
    }
  }

  async updateHotel(
    id: string,
    hotelData: IHotelsDto,
  ): Promise<IHotelsDto | null> {
    const { resource: existingHotel } = await this.hotelsContainer
      .item(id, id)
      .read();

    if (!existingHotel) return null;

    const updatedHotel = {
      ...existingHotel,
      ...hotelData,
    };

    const { resource } = await this.hotelsContainer
      .item(id, id)
      .replace(updatedHotel);

    return {
      id: resource.id,
      name: resource.name,
      location: resource.location,
      is_active: resource.is_active,
      created_by: resource.created_by,
    };
  }

  async deleteHotel(id: string): Promise<boolean> {
    const { resource } = await this.hotelsContainer.item(id, id).delete();
    return !resource;
  }

  async getHotelById(hotelId: string): Promise<IHotelsDto | null> {
    const { resource } = await this.hotelsContainer
      .item(hotelId, hotelId)
      .read();
    if (!resource) return null;
    return {
      id: resource.id,
      name: resource.name,
      location: resource.location,
      is_active: resource.is_active,
      created_by: resource.created_by,
    };
  }

  async toggleHotelStatus(
    hotelId: string,
    status: string,
  ): Promise<IHotelsDto | null> {
    const { resource } = await this.hotelsContainer
      .item(hotelId, hotelId)
      .patch([{ op: 'set', path: '/is_active', value: status }]);
    return {
      id: resource.id,
      name: resource.name,
      location: resource.location,
      is_active: resource.is_active,
      created_by: resource.created_by,
    };
  }
}

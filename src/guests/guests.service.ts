import { InjectModel } from '@nestjs/azure-database';
import { Injectable } from '@nestjs/common';
import { Guests } from './guests.entity';
import { Container } from '@azure/cosmos';
import { IGuestsDto } from './guests.dto';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class GuestsService {
    constructor(@InjectModel(Guests) private readonly guestsContainer: Container) {} 
    
    
    async getAllGuests(): Promise<IGuestsDto[]> {
        const querySql = 'SELECT * FROM c';
        const { resources } = await this.guestsContainer.items.query<Guests>(querySql
        ).fetchAll();

        return resources.map(guest => ({
            id: guest.id,
            name: guest.name,
            email: guest.email,
            phone: guest.phone,
            birthDate: guest.birthDate,
            documentType: guest.documentType,
            documentNumber: guest.documentNumber
        }));
    }

    async getGuestById(id: string): Promise<IGuestsDto> {
        const { resource } = await this.guestsContainer.item(id,id).read<Guests>();
        if (!resource)  throw new Error('Guest not found');

        return {
            id: resource.id,
            name: resource.name,
            email: resource.email,
            phone: resource.phone,
            birthDate: resource.birthDate,
            documentType: resource.documentType,
            documentNumber: resource.documentNumber
        }
    }
    async createGuest(guestData: IGuestsDto): Promise<IGuestsDto> {
        const { id, ...restGuestData } = guestData;
        let guest = new Guests();
        guest.id = uuidv4();
        const newGuest = { ...guest, ...restGuestData };
        const { resource } = await this.guestsContainer.items.create<Guests>(newGuest);
        return {
            id: resource!.id,
            name: resource!.name,
            email: resource!.email,
            phone: resource!.phone,
            birthDate: resource!.birthDate,
            documentType: resource!.documentType,
            documentNumber: resource!.documentNumber
        }
    }
    async updateGuest(id: string, guestData: IGuestsDto): Promise<IGuestsDto> {
        
        const { resource: existGuest } = await this.guestsContainer.item(id, id).read<Guests>();
        if (!existGuest) throw new Error('Guest not found');
        const updatedGuest = { ...existGuest, ...guestData };
        
       const {resource} = await this.guestsContainer.item(id, id).replace(updatedGuest);
        return {
            id: resource!.id,
            name: resource!.name,
            email: resource!.email,
            phone: resource!.phone,
            birthDate: resource!.birthDate,
            documentType: resource!.documentType,
            documentNumber: resource!.documentNumber
        };
    }

    async deleteGuest(id: string): Promise<boolean> {
        const { resource } = await this.guestsContainer.item(id,id).delete();
        return !resource;
    }
}

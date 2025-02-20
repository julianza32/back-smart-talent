import { InjectModel } from '@nestjs/azure-database';
import { Injectable } from '@nestjs/common';
import { Guests } from './guests.entity';
import { Container } from '@azure/cosmos';
import { IGuestsDto } from './guests.dto';

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
}

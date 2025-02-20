import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Users } from './users.entity';

@Module({
    imports: [
        AzureCosmosDbModule.forFeature([
            {
                collection: 'users',
                dto: Users
            }
        ])
    ],
    providers:[UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}

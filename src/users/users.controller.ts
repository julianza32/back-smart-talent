import { InjectModel } from '@nestjs/azure-database';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Users } from './users.entity';
import { Container } from '@azure/cosmos';
import { IUsersDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    @Get('all')
    async getUsers(): Promise<IUsersDto[]> {
        return this.usersService.getUsers();
    }
    @Post('create')
    async createUser(userData: IUsersDto): Promise<Users | null> {
        return this.usersService.createUser(userData);
    }
    @Get('id')
    async getUserById(userId: string): Promise<IUsersDto | null> {
        return this.usersService.getUserById(userId);
    }
    @Put('update/:id')
    async updateUser(@Param('id') id: string, userData: IUsersDto): Promise<Users | null> {
        return this.usersService.updateUserById(id, userData);
    }
    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        return this.usersService.deleteUserById(id);
    }
}

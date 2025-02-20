import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/azure-database';
import { Users } from './users.entity';
import { Container } from '@azure/cosmos';
import { IUsersDto } from './users.dto';
import { v4 as uuidv4 } from 'uuid'; // Importar UUID

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private readonly usersContainer: Container) {}

  async getUsers(): Promise<IUsersDto[]> {
    const querySql = 'SELECT * FROM c';
    const { resources } = await this.usersContainer.items
      .query<Users>(querySql)
      .fetchAll();

    return resources.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      phone: user.phone,
      type: user.type,
      create_at: user.create_at,
    }));
  }
  async createUser(userData: IUsersDto): Promise<Users | null> {
    const { id, ...restUserData } = userData;
    const newUser: Users = {
      id: uuidv4(),
      ...restUserData,
    };
    try {
      const { resource } = await this.usersContainer.items.create(newUser);
      return {
        id: resource!.id,
        name: resource!.name,
        email: resource!.email,
        password_hash: resource!.password_hash,
        phone: resource!.phone,
        type: resource!.type,
        create_at: resource!.create_at,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async getUserById(userId: string): Promise<IUsersDto | null> {
    const { resource } = await this.usersContainer.item(userId).read();
    if (!resource) return null;
    return {
      id: resource.id,
      name: resource.name,
      email: resource.email,
      password_hash: resource.password_hash,
      phone: resource.phone,
      type: resource.type,
      create_at: resource.create_at,
    };
  }

  async updateUserById(
    userId: string,
    userData: IUsersDto,
  ): Promise<IUsersDto> {
    try {
      const { id, ...restUserData } = userData;
    const { resource } = await this.usersContainer
      .item(userId)
      .replace({ id: userId, ...restUserData });
    return {
      id: resource!.id,
      name: resource!.name,
      email: resource!.email,
      password_hash: resource!.password_hash,
      phone: resource!.phone,
      create_at: resource!.create_at,
      type: resource!.type,
    };
    } catch (error) {
      throw new InternalServerErrorException('Error updating');
    }
    
  }

  async deleteUserById(userId: string): Promise<boolean> {
    try {
      const { resource } = await this.usersContainer.item(userId).delete();
      return !!resource;
      
    } catch (error) {
      throw new InternalServerErrorException('Error deleting');
    }
  }
}

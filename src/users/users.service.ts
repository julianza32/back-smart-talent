import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/azure-database';
import { Users } from './users.entity';
import { Container } from '@azure/cosmos';
import { IUsersDto } from './users.dto';
import { v4 as uuidv4 } from 'uuid'; 
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private readonly usersContainer: Container) {}

  async getUsers(): Promise<IUsersDto[]> {
    const querySql = 'SELECT * FROM c';
    const { resources } = await this.usersContainer.items
      .query<Users>(querySql)
      .fetchAll();

    return resources.map((user) => ({
      id: user.id ?? '',
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      phone: user.phone,
      type: user.type,
      create_at: user.create_at,
    }));
  }
  async createUser(userData: IUsersDto): Promise<Users | null> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password_hash, salt);


    const { id, create_at, password_hash, ...restUserData } = userData;

    try {
      let user = new Users();
      user.id = uuidv4();
      user.create_at = new Date();
      user.password_hash = hashedPassword;
      const newUser = { ...user, ...restUserData };

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
    const { resource } = await this.usersContainer.item(userId, userId).read();
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
      const { resource: existingUser } = await this.usersContainer
        .item(userId, userId)
        .read();

      if (!existingUser) throw new Error('Usuario no encontrado');
      const updatedUser = { ...existingUser, ...userData };
      const { resource } = await this.usersContainer
        .item(userId, userId)
        .replace(updatedUser);

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
      const { resource } = await this.usersContainer.item(userId,userId).delete();
      return !resource;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting');
    }
  }
  async login(email: string, password: string): Promise<IUsersDto | null> {
    const querySql = `SELECT * FROM c WHERE c.email = '${email}'`;
    const { resources } = await this.usersContainer.items.query<Users>(querySql).fetchAll();
    if (resources.length === 0) return null;
    const user = resources[0];
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return null;
    return {
      id: user.id??'',
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      phone: user.phone,
      type: user.type,
      create_at: user.create_at,
    };
  }
}

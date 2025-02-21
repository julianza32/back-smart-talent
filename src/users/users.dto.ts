import { typeUser } from "./users.entity";

export interface IUsersDto {
     id: string;
     name: string;
     email: string;
     password_hash: string;
     phone: string;
     type: typeUser;
     create_at?: Date;    
}

export interface ILoginDto {
     email: string;
     password: string;
}
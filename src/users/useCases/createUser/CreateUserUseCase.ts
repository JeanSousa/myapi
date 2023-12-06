import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs'
import { IRolesRepository } from "@roles/repositories/IRoleRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import {IUsersRepository } from "@users/repositories/IUsersRepository";

// dto criado para esse caso de uso 
type CreateUserDTO = {
    name: string
    email: string 
    password: string 
    isAdmin: boolean
    roleId: string 
}

@injectable()
export class CreateUserUseCase {
    constructor( 
        @inject('UsersRepository') private usersRepository: IUsersRepository,
        @inject('RolesRepository') private rolesRepository: IRolesRepository
    ){}

    async execute({
        name,
        email,
        password,
        isAdmin,
        roleId
    }: CreateUserDTO): Promise<User>{
        const emailExists = await this.usersRepository.findByEmail(email)

        if (emailExists) {
            throw new AppError('Email address already used')
        }

        const role = await this.rolesRepository.findById(roleId)
        
        if (!role) {
            throw new AppError('Role not found', 404)
        }

        // criptografando password com bcrypt
        // primeiro parametro senha, segundo salt
        const hashedPassword = await hash(password, 10)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            isAdmin,
            role
        })

        return user

    }

}
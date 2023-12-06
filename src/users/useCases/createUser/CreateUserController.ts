import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        // a instancia de createUserUseCase é resolvida pelo container 
        // que ira injetar o create user repository na use case
        const createUserUseCase = container.resolve(CreateUserUseCase)

        const { name, email, password, isAdmin, roleId } = request.body

        const user = await createUserUseCase.execute({
            name,
            email,
            password,
            isAdmin,
            roleId
        })

        // status 201 de criacao passando um json do usuario
        return response.status(201).json(user)
    }
}
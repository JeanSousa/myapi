import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLoginUseCase } from "./CreateLoginUseCase";
import { instanceToInstance } from "class-transformer";

export class CreateLoginController {
    async handle(request: Request, response: Response): Promise<Response> {
        // a instancia de createLoginUseCase é resolvida pelo container 
        // que ira injetar o user repository na use case
        const createLoginUseCase = container.resolve(CreateLoginUseCase)

        const { email, password } = request.body

        const { user, token} = await createLoginUseCase.execute({
            email,
            password
        })

        // status 201 de criacao passando um json do user e token
        // Intance to instance é um metodo do class transformer que obedece o exclude do campo decorado com @exclude na entidade
        return response.status(201).json(
            instanceToInstance({
                user, 
                token
            }),
        )
    }
}
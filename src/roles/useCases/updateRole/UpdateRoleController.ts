import { Request, Response } from "express";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";

export class UpdateRoleController {
  // atributo privado do construtor é um update role use case
  constructor(private updateRoleUseCase: UpdateRoleUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    // o id vai vir de request params, route param
    // desestruturo id do params para fazer a atualização
    const { id } = request.params

    // os dados a ser alterados pegamos do request body
    const { name } =  request.body

    // envio id e name para fazer o update
    const role = await this.updateRoleUseCase.execute({ id, name })

    return response.status(200).json(role)
  }
}

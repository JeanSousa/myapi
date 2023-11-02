import { Request, Response } from "express";
import { ShowRoleUseCase } from "./ShowRoleUseCase";

export class ShowRoleController {
  // atributo privado do construtor é um show role use case
  constructor(private showRoleUseCase: ShowRoleUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    // o id vai vir de request params, route param
    // desestruturo id do params
    const { id } = request.params

    const role = await this.showRoleUseCase.execute({ id })

    return response.status(200).json(role)
  }
}

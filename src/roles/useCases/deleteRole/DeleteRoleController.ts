import { Request, Response } from "express";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";

export class DeleteRoleController {
  // atributo privado do construtor é um delete role use case
  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    // o id vai vir de request params, route param
    // desestruturo id do params
    const { id } = request.params

    // apenas chamo o execute com await porque ele não tem retorno
    await this.deleteRoleUseCase.execute({ id })

    // 204 é para retorno sem conteudo (no content)
    // .send é usado quando não precisa retornar uma estrutura json
    return response.status(204).send()
  }
}

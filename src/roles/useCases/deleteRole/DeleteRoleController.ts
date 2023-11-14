import { Request, Response } from "express";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";
import { container } from "tsyringe";

export class DeleteRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    // aqui recebo a instancia use case do container resolvida
    // ou seja com a repository injetada nela
    const deleteRoleUseCase = container.resolve(DeleteRoleUseCase)
    // o id vai vir de request params, route param
    // desestruturo id do params
    const { id } = request.params

    // apenas chamo o execute com await porque ele não tem retorno
    await deleteRoleUseCase.execute({ id })

    // 204 é para retorno sem conteudo (no content)
    // .send é usado quando não precisa retornar uma estrutura json
    return response.status(204).send()
  }
}

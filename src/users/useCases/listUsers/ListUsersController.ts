import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";
import { instanceToInstance } from "class-transformer";

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase)

    const page = request.query.page && Number(request.query.page) > 0
      ? Number(request.query.page)
      : 1

    // se enviou limit pega o number dele, caso não tenha enviado pego 15
    const limit = request.query.limit && Number(request.query.limit) > 0
      ? Number(request.query.limit)
      : 15

    const users = await listUsersUseCase.execute({ page, limit})
    // não retorno o status code porque o padrão é 200
    // Intance to instance é um metodo do class transformer que obedece o exclude do campo decorado com @exclude na entidade
    return response.json(instanceToInstance(users))
  }
}

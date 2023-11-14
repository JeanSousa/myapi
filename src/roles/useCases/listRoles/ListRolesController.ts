import { Request, Response } from "express";
import { ListRolesUseCase } from "./ListRolesUseCase";
import { container } from "tsyringe";

export class ListRolesController {
  //handle é o metodo que executa a listagem
  // tipo os parametros como Request e Response do tipo do express
  // pois como não importo router eles são desconhecidos
  async handle(request: Request, response: Response): Promise<Response> {
    const listRolesUseCase = container.resolve(ListRolesUseCase)
    // GET /roles?page=5&limit=10  =>  page = 5  e limit = 10
    // exite um query param page, se existe e o numero for maior que zero vou retornar um numero disso
    // caso não seja mairo que zero ou não existe retorno 1
    const page = request.query.page && Number(request.query.page) > 0
      ? Number(request.query.page)
      : 1

    // se enviou limit pega o number dele, caso não tenha enviado pego 15
    const limit = request.query.limit && Number(request.query.limit) > 0
      ? Number(request.query.limit)
      : 15

    const roles = await listRolesUseCase.execute({ page, limit})
    // não retorno o status code porque o padrão é 200
    return response.json(roles)
  }
}

import { Request, Response } from "express";
import { ListRolesUseCase } from "./ListRolesUseCase";

export class ListRolesController {
  constructor(private listRolesUseCase: ListRolesUseCase){}

  //handle é o metodo que executa a listagem
  // tipo os parametros como Request e Response do tipo do express
  // pois como não importo router eles são desconhecidos
  handle(request: Request, response: Response): Response {
    const roles = this.listRolesUseCase.execute()
    // não retorno o status code porque o padrão é 200
    return response.json(roles)
  }
}

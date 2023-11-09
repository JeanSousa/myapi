import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

export class CreateRoleController {
  // como tem um unico método que vai ter a ação de criar um usuario vai ser um handle
  // o metodo vai receber a request e response para pegarmos os dados da request e responser com a response
  // obs: onde temos o Router importado ja temos os tipos de request e response conhecidos e etribuidos automaticamente
  // ou seja são tipos do express e ja tem a instancia do router, nesse caso especifico devo tipar com o Request e Response do express
  // importando a tipagem do express
  async handle(request: Request, response: Response): Promise<Response> {
    // não preciso de construtor pois a instancia de CreateRoleUseCase é resolvida pelo container
    // que ira injetar uma instancia unica da roleRepository dentro dela
    // https://github.com/microsoft/tsyringe#injectable
    const createRoleUseCase = container.resolve(CreateRoleUseCase)

    const { name } = request.body

    const role = await createRoleUseCase.execute({ name })

    return response.status(201).json(role)
  }
}

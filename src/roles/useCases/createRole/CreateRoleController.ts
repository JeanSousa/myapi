import { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

export class CreateRoleController {
  // atributo privado do construtor é um create role use case
  constructor(private createRoleUseCase: CreateRoleUseCase) {}
  // como tem um unico método que vai ter a ação de criar um usuario vai ser um handle
  // o metodo vai receber a request e response para pegarmos os dados da request e responser com a response
  // obs: onde temos o Router importado ja temos os tipos de request e response conhecidos e etribuidos automaticamente
  // ou seja são tipos do express e ja tem a instancia do router, nesse caso especifico devo tipar com o Request e Response do express
  // importando a tipagem do express
  handle(request: Request, response: Response): Response {
    const { name } = request.body

    const role = this.createRoleUseCase.execute({ name })

    return response.status(201).json(role)
  }
}

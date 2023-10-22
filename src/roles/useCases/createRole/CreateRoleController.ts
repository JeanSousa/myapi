import { RolesRepository } from "@roles/repositories/RoleRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";

export class CreateRoleController {
  // como tem um unico método que vai ter a ação de criar um usuario vai ser um handle
  // o metodo vai receber a request e response para pegarmos os dados da request e responser com a response
  // obs: onde temos o Router importado ja temos os tipos de request e response conhecidos e etribuidos automaticamente
  // ou seja são tipos do express e ja tem a instancia do router, nesse caso especifico devo tipar com o Request e Response do express
  // importando a tipagem do express
  handle(request: Request, response: Response): Response {
    const { name } = request.body

    const rolesRepository = new RolesRepository()

    //fazendo verificação se name existe
    const roleAlreadyExists = rolesRepository.findByname(name)

    if (roleAlreadyExists) {
      // retorno 400 bad request como padrao nesse throw
      throw new AppError('Role already Exists')
    }

    // tenho que passar o name como objeto pois tenho o tipo objeto no createroleDTO
    const role = rolesRepository.create({ name })

    return response.status(201).json(role)
  }
}

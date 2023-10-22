// definindo o DTO

import { Role } from "@roles/entities/Role"
import { RolesRepository } from "@roles/repositories/RoleRepository"
import { AppError } from "@shared/errors/AppError"

// que define o tipo das propriedades para criação de uma role
type CreateRoleDTO = {
  name: string
}

export class CreateRoleUseCase {
  constructor(private roleRepository: RolesRepository) {}

  // quando se executa a criacao de uma role eu defino o tipo createroleDTO como parametro
  // recebo suas propriedades desestruturando name
  execute({name}: CreateRoleDTO): Role {
    // chamo role repository com this pois é um atributo da classe
    const roleAlreadyExists = this.roleRepository.findByname(name)

    if (roleAlreadyExists) {
      // retorno 400 bad request como padrao nesse throw
      throw new AppError('Role already Exists')
    }

    return this.roleRepository.create({ name })
  }

}

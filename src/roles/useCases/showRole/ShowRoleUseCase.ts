// definindo o DTO

import { Role } from "@roles/entities/Role"
import { RolesRepository } from "@roles/repositories/RoleRepository"
import { AppError } from "@shared/errors/AppError"

// que define o tipo das propriedades para o show
// semanticamente fica melhor params do que DTO pois não estamos criando nada
type ShowRoleParams = {
  id: string
}

export class ShowRoleUseCase {
  constructor(private roleRepository: RolesRepository) {}

  // quando se executa o show de uma role eu defino o tipo showRoleDTO como parametro
  // recebo suas propriedades desestruturando ID
  async execute({ id }: ShowRoleParams): Promise<Role> {
    // chamo role repository com this pois é um atributo da classe
    const role = await this.roleRepository.findById(id)

    if (!role) {
      // retorno 404
      throw new AppError('Role not Found', 404)
    }

    return role
  }

}

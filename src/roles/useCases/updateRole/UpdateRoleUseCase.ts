// definindo o DTO

import { Role } from "@roles/entities/Role"
import { RolesRepository } from "@roles/repositories/RoleRepository"
import { AppError } from "@shared/errors/AppError"

// DTO pois recebemos do client os dados que iremos armazenar
// aqui faço a tipagem dos parametros
type UpdateRoleDTO = {
  id: string
  name: string
}

export class UpdateRoleUseCase {
  constructor(private roleRepository: RolesRepository) {}

  // quando se executa o update de uma role eu defino o tipo UpdateRoleDTO como parametro
  // recebo suas propriedades desestruturando id e name
  async execute({ id, name }: UpdateRoleDTO): Promise<Role> {
    // chamo role repository com this pois é um atributo da classe
    const role = await this.roleRepository.findById(id)

    if (!role) {
      // retorno 404
      throw new AppError('Role not Found', 404)
    }

    // Regra de negocio, não armazenar um nome de role que já esteja em uso
    const roleWithSameName = await this.roleRepository.findByName(name)

    // se existir um role com esse name em uso && for diferente do name do role atual buscado pelo id
    if (roleWithSameName && role.name !== roleWithSameName.name) {
      throw new AppError('Role name not informed or already in use')
    }

    // se não é o mesmo nome posso atribuir o name que veio no parametro para a role
    role.name = name

    return this.roleRepository.save(role)
  }

}

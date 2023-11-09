import { RolesRepository } from "@roles/repositories/RoleRepository"
import { AppError } from "@shared/errors/AppError"

// que define o tipo das propriedades para o delte
// semanticamente fica melhor params do que DTO pois não estamos criando nada
type DeleteRoleParams = {
  id: string
}

export class DeleteRoleUseCase {
  constructor(private roleRepository: RolesRepository) {}

  // quando se executa o delete de uma role eu defino o tipo DeleteRoleParams como parametro
  // recebo suas propriedades desestruturando ID
  async execute({ id }: DeleteRoleParams): Promise<void> {
    // chamo role repository com this pois é um atributo da classe
    const role = await this.roleRepository.findById(id)

    if (!role) {
      // retorno 404
      throw new AppError('Role not Found', 404)
    }

    // não retorna nada apenas uso o type orm para deltar atraves da repository
    await this.roleRepository.delete(role)
  }

}

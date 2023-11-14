import { IRolesRepository } from "@roles/repositories/IRoleRepository"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

// que define o tipo das propriedades para o delte
// semanticamente fica melhor params do que DTO pois não estamos criando nada
type DeleteRoleParams = {
  id: string
}

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private roleRepository: IRolesRepository // como é apenas a tipagem uso a interface e não a implementação
  ) {}

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

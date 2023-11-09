// definindo o DTO

import { Role } from "@roles/entities/Role"
import { IRolesRepository } from "@roles/repositories/IRoleRepository"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

// que define o tipo das propriedades para criação de uma role
type CreateRoleDTO = {
  name: string
}
// o decorator injectable mostra que a classe pode receber injecao de dependencia
// ja o decorator inject é a propria injeção de dependencia passando o TOKEN do container que é controlada
// pelo proprio container não permitindo ter mais de uma instancia
@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject('RolesRepository') // inject é o decorator que injeta a instancia roles repository atraves do parametro token passado
    private roleRepository: IRolesRepository, // o tipo eu defino com a interface e não com a implementacao
  ) {}

  // quando se executa a criacao de uma role eu defino o tipo createroleDTO como parametro
  // recebo suas propriedades desestruturando name
  async execute({name}: CreateRoleDTO): Promise<Role> {
    // chamo role repository com this pois é um atributo da classe
    const roleAlreadyExists = await this.roleRepository.findByName(name)

    if (roleAlreadyExists) {
      // retorno 400 bad request como padrao nesse throw
      throw new AppError('Role already Exists')
    }

    return this.roleRepository.create({ name })
  }

}

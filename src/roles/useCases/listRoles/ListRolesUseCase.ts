import { RolesPaginateProperties } from "@roles/repositories/IRoleRepository";
import { RolesRepository } from "@roles/repositories/RoleRepository";

// tipando uma entrada para o metodo execute do use case
type ListRolesUseCaseParams = {
  page: number
  limit: number
}

export class ListRolesUseCase {
  constructor(private rolesRepository: RolesRepository){}

  // metodo execute retorna um array de Role
  async execute({ limit, page }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
    // take é a quantidade de registros que vou pegar
    const take = limit

    const skip = (Number(page - 1)) * take

    return this.rolesRepository.findAll({ page, skip, take })
  }

}

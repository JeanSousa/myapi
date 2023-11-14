import { IRolesRepository, RolesPaginateProperties } from "@roles/repositories/IRoleRepository";
import { inject, injectable } from "tsyringe";

// tipando uma entrada para o metodo execute do use case
type ListRolesUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListRolesUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository
  ){}

  // metodo execute retorna um array de Role
  async execute({ limit, page }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
    // take é a quantidade de registros que vou pegar
    const take = limit

    const skip = (Number(page - 1)) * take

    return this.rolesRepository.findAll({ page, skip, take })
  }

}

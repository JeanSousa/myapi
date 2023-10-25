import { Role } from "@roles/entities/Role";
import { RolesRepository } from "@roles/repositories/RoleRepository";

export class ListRolesUseCase {
  constructor(private rolesRepository: RolesRepository){}

  // metodo execute retorna um array de Role
  execute(): Role[] {
    return this.rolesRepository.findAll()
  }
}

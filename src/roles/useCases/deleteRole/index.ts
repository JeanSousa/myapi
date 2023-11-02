import { RolesRepository } from "@roles/repositories/RoleRepository";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";
import { DeleteRoleController } from "./DeleteRoleController";


const rolesRepository = RolesRepository.getInstance()
const deleteRoleUseCase = new DeleteRoleUseCase(rolesRepository)
// exporto uma instancia do controller ja com suas dependencias em seus respectivos construtores
export const deleteRolesController = new DeleteRoleController(deleteRoleUseCase)

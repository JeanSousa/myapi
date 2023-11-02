import { RolesRepository } from "@roles/repositories/RoleRepository";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";
import { UpdateRoleController } from "./UpdateRoleController";


const rolesRepository = RolesRepository.getInstance()
const updateRoleUseCase = new UpdateRoleUseCase(rolesRepository)
// exporto uma instancia do controller ja com suas dependencias em seus respectivos construtores
export const updateRolesController = new UpdateRoleController(updateRoleUseCase)

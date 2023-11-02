import { RolesRepository } from "@roles/repositories/RoleRepository";
import { ShowRoleUseCase } from "./ShowRoleUseCase";
import { ShowRoleController } from "./ShowRoleController";


const rolesRepository = RolesRepository.getInstance()
const showRoleUseCase = new ShowRoleUseCase(rolesRepository)
// exporto uma instancia do controller ja com suas dependencias em seus respectivos construtores
export const showRoleController = new ShowRoleController(showRoleUseCase)

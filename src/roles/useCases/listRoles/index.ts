import { RolesRepository } from "@roles/repositories/RoleRepository";
import { ListRolesUseCase } from "./ListRolesUseCase";
import { ListRolesController } from "./ListRolesController";

const rolesRepository = new RolesRepository()
const listRolesUseCase = new ListRolesUseCase(rolesRepository)
export const listRolesController = new ListRolesController(listRolesUseCase)

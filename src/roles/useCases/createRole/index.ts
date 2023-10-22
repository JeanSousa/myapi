// Arquivo de importacoes
import { RolesRepository } from "@roles/repositories/RoleRepository";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { CreateRoleController } from "./CreateRoleController";

const rolesRepository = new RolesRepository()
// instancia do use case precisa da instancia da roles repository
// ao use case receber a instancia de rolesRepository por parametro e não criar uma instancia
// ele preserva os dados (caso seja de um array), pois se criasse uma cada post sempre teria so um item
const createRoleUseCase = new CreateRoleUseCase(rolesRepository)
// instancia do create role controller precisa da create role use case como parametro
export const createRoleController= new CreateRoleController(createRoleUseCase)



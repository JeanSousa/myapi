// Arquivo de importacoes
import { RolesRepository } from "@roles/repositories/RoleRepository";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { CreateRoleController } from "./CreateRoleController";

// em vez de instanciar a classe roles repository eu executo esse metodo estatico
// getInstance que vai instanciar a classe ou então pegar o valor se ja tiver instanciada
const rolesRepository = RolesRepository.getInstance()
// instancia do use case precisa da instancia da roles repository
// ao use case receber a instancia de rolesRepository por parametro e não criar uma instancia
// ele preserva os dados (caso seja de um array), pois se criasse uma cada post sempre teria so um item
const createRoleUseCase = new CreateRoleUseCase(rolesRepository)
// instancia do create role controller precisa da create role use case como parametro
export const createRolesController= new CreateRoleController(createRoleUseCase)



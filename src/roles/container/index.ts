import { IRolesRepository } from "@roles/repositories/IRoleRepository"
import { RolesRepository } from "@roles/repositories/RoleRepository"
import { CreateRoleController } from "@roles/useCases/createRole/CreateRoleController"
import { DeleteRoleController } from "@roles/useCases/deleteRole/DeleteRoleController"
import { ListRolesController } from "@roles/useCases/listRoles/ListRolesController"
import { ShowRoleController } from "@roles/useCases/showRole/ShowRoleController"
import { UpdateRoleController } from "@roles/useCases/updateRole/UpdateRoleController"
import { container } from "tsyringe"

// precisamos importar o repositorio para injetar nas usecase, no entanto para poder utilizar o repositorio no container
// precisamos criar uma interface para definir a estrutura de repositorio de roles na aplicação para as implementações seguir essa estrutura
// foi criada em src/roles/repositories/IRolesRepository.ts (prefixo I de interface)

// REGISTER SINGLETON = cria uma unica instancia da classe no ciclo da aplicação
// o primeiro parametro é o token (proprio nome da classe para incluir no container) e o segundo é instanciar a classe em si
// no generic<> passo a tipagem da classe que é a interface
container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)

// configurando cada controller com o container
// usando o register singleton para registrar os controllers
container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('ListRolesController', ListRolesController)
container.registerSingleton('ShowRoleController', ShowRoleController)
container.registerSingleton('UpdateRoleController', UpdateRoleController)
container.registerSingleton('DeleteRoleController', DeleteRoleController)

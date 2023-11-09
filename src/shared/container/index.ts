// importando o container para podermos utilizar a injeção de dependencia
import { IRolesRepository } from "@roles/repositories/IRoleRepository";
import { RolesRepository } from "@roles/repositories/RoleRepository";
import { container } from "tsyringe";
// precisamos importar o repositorio para injetar nas usecase, no entanto para poder utilizar o repositorio no container
// precisamos criar uma interface para definir a estrutura de repositorio de roles na aplicação para as implementações seguir essa estrutura
// foi criada em src/roles/repositories/IRolesRepository.ts (prefixo I de interface)

// REGISTER SINGLETON = cria uma unica instancia da classe no ciclo da aplicação
// o primeiro parametro é o token (proprio nome da classe para incluir no container) e o segundo é instanciar a classe em si
// no generic<> passo a tipagem da classe que é a interface
container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)

// BASTA A IMPORTAÇÃO DESSE ARQUIVO EM app.ts PARA QUE O CONTAINER FUNCIONE

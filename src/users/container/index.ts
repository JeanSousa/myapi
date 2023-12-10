import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

// Registrando o controllers de usuario no container para que ele gerencie a instancia desse controller
// e possibilite a rota acessar essa instancia, uso o metodo registerSingleton para registrar
// primeiro parametro uso como token e o segundo a classe
container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsersController', ListUsersController)
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

// Registrando o controller de usuario no container para que ele gerencie a instancia desse controller
// e possibilite a rota acessar essa instancia, uso o metodo registerSingleton para registrar
container.registerSingleton('CreateUserController', CreateUserController)
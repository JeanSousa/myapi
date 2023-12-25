import { Router } from "express";
// celebrate joi e segments para campos obrigatorios na request (middleware)
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";

const usersRouter = Router()
// controller pega uma instancia unica do container
const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: { //Segments body pois validamos o corpo da requisicao
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            isAdmin: Joi.boolean().required(),
            roleId: Joi.string().uuid().required()
        },
    }),
    (request, response) => {
        return createUserController.handle(request, response)
    }
)

usersRouter.get(
    '/',
    celebrate({
        [Segments.QUERY]: { //Segments query pois validamos query string da requisicao
            page: Joi.number(),
            limit: Joi.number(),
        },
    }),
    (request, response) => {
        return listUsersController.handle(request, response)
    }
)

usersRouter.post(
    '/login',
    celebrate({
        [Segments.BODY]: { //Segments body pois validamos o corpo da requisicao
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    (request, response) => {
        return createLoginController.handle(request, response)
    }
)


// exportando o router para utilizar a rota criada
export { usersRouter }
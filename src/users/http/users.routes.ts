import { Router } from "express";
// celebrate joi e segments para campos obrigatorios na request (middleware)
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";

const usersRouter = Router()
// controller pega uma instancia unica do container
const createUserController = container.resolve(CreateUserController)

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

// exportando o router para utilizar a rota criada
export { usersRouter }
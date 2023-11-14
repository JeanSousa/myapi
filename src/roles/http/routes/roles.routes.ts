// tem que importar o route do express quando precisa criar rotas fora do arquivo que esta a
// instancia do express atraves do router conseguimos criar
import { Router } from 'express';
// importando do celebrate os recursos utilizados para fazer validação
import { celebrate, Joi, Segments } from 'celebrate';
import { container } from 'tsyringe';
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController';
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController';
import { ShowRoleController } from '@roles/useCases/showRole/ShowRoleController';
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController';
import { DeleteRoleController } from '@roles/useCases/deleteRole/DeleteRoleController';


// rolesRouter recebe uma instancia de Router
const rolesRouter = Router()

// assim não preciso instanciar os controller, o container do tsyringe
// vai fazer o controle das instancias dos controllers, inclusive usando o padrão de projeto singleton
// que cria uma única instancia na aplicação a cada ciclo da aplicação
const createRolesController = container.resolve(CreateRoleController)
const listRolesController = container.resolve(ListRolesController)
const showRolesController = container.resolve(ShowRoleController)
const updateRolesController = container.resolve(UpdateRoleController)
const deleteRolesController = container.resolve(DeleteRoleController)


rolesRouter.post('/', celebrate({ // uso celebrata para validar, se a validação não estiver correta não é chamado o controller, ele funciona como middleware
    [Segments.BODY]: Joi.object().keys({
      // o name tem que ser uma string e também é requerido
      name: Joi.string().required(),
    }),
}), (request, response) => {
  // retorna o response do metodo handle da controller passo request e response como parametro
  // importo o controller instancia e não a classe
  return createRolesController.handle(request, response)
})

// rota GET http://localhost:3000/roles para listar
rolesRouter.get('/', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number()
  }),
}),  (request, response) => {
  // o controller importado é uma instancia e não uma classe
  return listRolesController.handle(request, response)
})

// rota GET http://localhost:3000/roles/<id do role> para exibir apenas uma role
rolesRouter.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
}), (request, response) => {
  // o controller importado é uma instancia e não uma classe
  return showRolesController.handle(request, response)
})

// rota PUT http://localhost:3000/roles/<id do role> para atualizar uma role
rolesRouter.put('/:id', celebrate({
  // put tem que validar os parametros
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  //put valida o body tambem que é o name
  [Segments.BODY]: Joi.object().keys({
    // o name tem que ser uma string e também é requerido
    name: Joi.string().required(),
  }),
}), (request, response) => {
  return updateRolesController.handle(request, response)
})

// rota DELETE http://localhost:3000/roles/<id do role> para deletar uma role
rolesRouter.delete('/:id',  celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
}), (request, response) => {
  return deleteRolesController.handle(request, response)
})


export { rolesRouter }

// tem que importar o route do express quando precisa criar rotas fora do arquivo que esta a
// instancia do express atraves do router conseguimos criar
import { RolesRepository } from '@roles/repositories/RoleRepository';
import { createRoleController } from '@roles/useCases/createRole';
import { Router } from 'express';

// rolesRouter recebe uma instancia de Router
const rolesRouter = Router()

const rolesRepository = new RolesRepository()


rolesRouter.post('/', (request, response) => {
  // retorna o response do metodo handle da controller
  // passo request e response como parametro
  // importo o controller instancia e não a classe
  return createRoleController.handle(request, response)
})

// rota GET http://localhost:3000/roles para listar
rolesRouter.get('/', (request, response) => {
  const roles = rolesRepository.findAll()

  // o status code 200 é padrão
  return response.json(roles)
})


export { rolesRouter }

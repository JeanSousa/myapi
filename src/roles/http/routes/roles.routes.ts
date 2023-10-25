// tem que importar o route do express quando precisa criar rotas fora do arquivo que esta a
// instancia do express atraves do router conseguimos criar
import { createRoleController } from '@roles/useCases/createRole';
import { listRolesController } from '@roles/useCases/listRoles';
import { Router } from 'express';

// rolesRouter recebe uma instancia de Router
const rolesRouter = Router()

rolesRouter.post('/', (request, response) => {
  // retorna o response do metodo handle da controller
  // passo request e response como parametro
  // importo o controller instancia e não a classe
  return createRoleController.handle(request, response)
})

// rota GET http://localhost:3000/roles para listar
rolesRouter.get('/', (request, response) => {
  // o controller importado é uma instancia e não uma classe
  return listRolesController.handle(request, response)
})


export { rolesRouter }

// tem que importar o route do express quando precisa criar rotas fora do arquivo que esta a
// instancia do express atraves do router conseguimos criar
import { createRoleController } from '@roles/useCases/createRole';
import { listRolesController } from '@roles/useCases/listRoles';
import { showRoleController } from '@roles/useCases/showRole'; // nao especifico o arquivo pois esta no index
import { updateRolesController } from '@roles/useCases/updateRole';
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

// rota GET http://localhost:3000/roles/<id do role> para exibir apenas uma role
rolesRouter.get('/:id', (request, response) => {
  // o controller importado é uma instancia e não uma classe
  return showRoleController.handle(request, response)
})

// rota PUT http://localhost:3000/roles/<id do role> para atualizar uma role
rolesRouter.put('/:id', (request, response) => {
  return updateRolesController.handle(request, response)
})



export { rolesRouter }

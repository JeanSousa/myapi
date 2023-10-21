// tem que importar o route do express quando precisa criar rotas fora do arquivo que esta a
// instancia do express atraves do router conseguimos criar
import { RolesRepository } from '@roles/repositories/RoleRepository';
import { Router } from 'express';

// rolesRouter recebe uma instancia de Router
const rolesRouter = Router()

// criando uma instancia da repository
const rolesRepository = new RolesRepository()


rolesRouter.post('/', (request, response) => {
  const { name } = request.body

  // tenho que passar o name como objeto pois tenho o tipo objeto no createroleDTO
  const role = rolesRepository.create({ name })

  return response.status(201).json(role)
})


export { rolesRouter }

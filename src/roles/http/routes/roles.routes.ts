// tem que importar o route do express quando precisa criar rotas fora do arquivo que esta a
// instancia do express atraves do router conseguimos criar
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid'

// rolesRouter recebe uma instancia de Router
const rolesRouter = Router()

const roles = []


rolesRouter.post('/', (request, response) => {
  const { name } = request.body

  const role = {
    id: uuidv4(),
    name,
    created_at: new Date(),
  }

  roles.push(role)

  return response.status(201).json(role)
})


export { rolesRouter }

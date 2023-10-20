// Arquivo principal de rotas, tem que importar o route do express
// quando precisa criar rotas fora do arquivo que esta a instancia do express atraves do router conseguimos criar
import { AppError } from '@shared/errors/AppError'
import { Router } from 'express'

const routes = Router()

routes.get('/', (request, response) => {
  throw  new AppError('Acesso Negado', 401)
  return response.json({
    message: 'Ola Dev!',
  })
})

// exportar o arquivo que possui as rotas
export { routes }

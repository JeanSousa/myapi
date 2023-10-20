// Arquivo principal de rotas, tem que importar o route do express
// quando precisa criar rotas fora do arquivo que esta a instancia do express atraves do router conseguimos criar
import { Router } from 'express'

const routes = Router()

routes.get('/', (request, response) => {
  throw new Error('Acesso Negado')
  return response.json({
    message: 'Ola Dev!',
  })
})

// exportar o arquivo que possui as rotas
export { routes }

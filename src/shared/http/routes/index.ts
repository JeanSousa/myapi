// Arquivo principal de rotas, tem que importar o route do express
// quando precisa criar rotas fora do arquivo que esta a instancia do express atraves do router conseguimos criar
import { Router } from 'express'
import { rolesRouter } from '@roles/http/routes/roles.routes' // importando as rotas de roles para utilizar
import { usersRouter } from '@users/http/users.routes'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({
    message: 'Ola Dev!',
  })
})

// Se enviar uma requisição POST http://localhost:3000/roles
// ira cair nessa rota, no entanto ela chamara o arquivo rolesRouter e ira cair na rota POST '/'
// O roles aqui abaixo é como se fosse um prefixo para as rotas do arquivo rolesRouter
routes.use('/roles', rolesRouter)

routes.use('/users', usersRouter)

// exportar o arquivo que possui as rotas
export { routes }

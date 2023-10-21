// tem que importar o route do express quando precisa criar rotas fora do arquivo que esta a
// instancia do express atraves do router conseguimos criar
import { Role } from '@roles/entities/Role';
import { Router } from 'express';

// rolesRouter recebe uma instancia de Router
const rolesRouter = Router()

// o tipo do array roles é um array da entidade Role
const roles: Role[] = []


rolesRouter.post('/', (request, response) => {
  const { name } = request.body

  // ao criar a instancia a role já tem o id definido, pois foi definido no constructor da classe
  const role = new Role()

  // aqui faço o merge do objeto role instanciado com o restante das informações name e created
  // o metodo object assign faz isso, e o primeiro parametro é o objeto target (alvo)
  // o segundo são as informações que serão assinadas nesse objeto
  Object.assign(role, {
    name,
    created_at: new Date(),
  })

  // atribuindo ao
  roles.push(role)

  return response.status(201).json(role)
})


export { rolesRouter }

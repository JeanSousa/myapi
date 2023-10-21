import { Role } from "@roles/entities/Role"

// é o data transfrer object
// ele tipa o tipo de informação que deve receber no metodo create para que uma role seja criada
type CreateRoleDTO = {
  name: string
}

export class RolesRepository {
  // o tipo do array roles é um array da entidade Role
  private roles: Role[]

  constructor() {
    this.roles = []
  }

  // metodo de criacao
  // desestruturo name do objeto CreateRoleDTO
  create({ name }: CreateRoleDTO) {
      // ao criar a instancia a role já tem o id definido, pois foi definido no constructor da classe
      const role = new Role()

      // aqui faço o merge do objeto role instanciado com o restante das informações name e created
      // o metodo object assign faz isso, e o primeiro parametro é o objeto target (alvo)
      // o segundo são as informações que serão assinadas nesse objeto
      Object.assign(role, {
        name,
        created_at: new Date(),
      })

      // atribuindo ao array roles
      this.roles.push(role)

      return role
  }
}
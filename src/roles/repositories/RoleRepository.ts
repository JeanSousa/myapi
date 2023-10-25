import { Role } from "@roles/entities/Role"

// é o data transfrer object
// ele tipa o tipo de informação que deve receber no metodo create para que uma role seja criada
type CreateRoleDTO = {
  name: string
}

export class RolesRepository {
  // o tipo do array roles é um array da entidade Role
  private roles: Role[]

  //criando o pattern singleton, um ponto unico de acesso
  // static pois é um atributo de classe e não da instancia
  private static INSTANCE: RolesRepository


  // se o constructor for privado em nenhum lugar iremos conseguir
  // instanciar a classe com "new RolesRepository()"
  private constructor() {
    this.roles = []
  }

  // esse método publico garante que a instancia seja unica
  // é static pois é um atributo de classe e não de instancia da classe
  public static getInstance(): RolesRepository {
    // se não existe atribui uma instancia
    if (!RolesRepository.INSTANCE) {
      RolesRepository.INSTANCE = new RolesRepository()
    }
    return RolesRepository.INSTANCE
  }


  // metodo de criacao
  // desestruturo name do objeto CreateRoleDTO
  create({ name }: CreateRoleDTO): Role {
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

  findAll(): Role[] {
    return this.roles
  }

  // quando não encontrar entidade retornara undefined
  findByname(name: string): Role | undefined {
    // role (cada role) na arrow function verifico se o name de alguma role
    // é igual ao name passado por parametro
    // a arrow function sem as chaves retorna diretamente
    // com as chaves tem que ter o retorno explicito
    return this.roles.find(role => role.name === name)
  }
}

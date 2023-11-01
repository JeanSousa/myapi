import { Role } from "@roles/entities/Role"

// crio o repository através de uma entidade utilizando uma instancia do datasource
// a entidade representa a tabela no banco de dados
import { dataSource } from "@shared/typeorm"
import { Repository } from "typeorm"

// é o data transfrer object
// ele tipa o tipo de informação que deve receber no metodo create para que uma role seja criada
type CreateRoleDTO = {
  name: string
}

// definindo um type para paginate params
export type PaginateParams = {
  page: number,
  skip: number, //numero de registros que quero pular
  take: number // quantos registros quero pegar depois que pulei um numero
}

// definindo um type para informações retornadas
export type RolesPaginateProperties = {
  per_page: number,
  total: number,
  current_page: number,
  data: Role[] // dados retorna um array de roles
}

export class RolesRepository {
  // o tipo vai ser repository do type orm, que pelo generic '<>' digo qual informação ele lida que é a entidade Role
  private repository: Repository<Role>

  //criando o pattern singleton, um ponto unico de acesso
  // static pois é um atributo de classe e não da instancia
  private static INSTANCE: RolesRepository


  // se o constructor for privado em nenhum lugar iremos conseguir
  // instanciar a classe com "new RolesRepository()"
  private constructor() {
    // crio o repository através de uma entidade Role utilizando uma instancia do datasource
    // o metodo getRepository do datasource retorna o tipo Repository do typeorm
    this.repository = dataSource.getRepository(Role)
  }

  // esse método publico garante que a instancia seja unica
  // é static pois é um atributo de classe e não de instancia da classe
  public static getInstance(): RolesRepository {
    // se não existe atribui uma instancia
    if (!RolesRepository.INSTANCE) {
      // aqui quando tem uma nova instancia passa pelo construtor e this.repository recebe
      // uma instancia do metodo getRepository do data source atribuindo uma entidade Role a
      // essa repository
      RolesRepository.INSTANCE = new RolesRepository()
    }
    return RolesRepository.INSTANCE
  }


  // metodo de criacao
  // desestruturo name do objeto CreateRoleDTO
  // metodo asincrono como pode demorar
  // retorna uma promisse da entidade role
  async create({ name }: CreateRoleDTO): Promise<Role> {
      // o metodo create é do proprio type orm
      const role = this.repository.create({ name }) // esse name é uma short sintax
      // metodo save do typeorm salva no banco de dados
      return this.repository.save(role)
  }

  // metodo para atualizar uma informação
  async save(role: Role): Promise<Role> {
    // estou atualizando o role com os dados atualizados que recebo no parametro
    return this.repository.save(role)
  }

  // o retorno é uma promessa de void (não retorna nada porque o dado esta sendo apagado)
  async delete(role: Role): Promise<void> {
    // executo apenas await porque não precisa de retorno porque é void
    // o remove recebe a entidade completa, se fosse delete receberia apenas o id
    await this.repository.remove(role)
  }

  // desestruturo os parametros do type PaginateParams criados
  async findAll({
    page,
    skip,
    take
  }: PaginateParams): Promise<RolesPaginateProperties> {
    // roles e count esta desestruturando nesse array o resultado de getManyAndCount da query feita com query builder
    const [roles, count] = await this.repository.createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount() // esse get many retorna roles e um count

    // esse result é exatamente do type RolesPaginateProperties
    const result = {
      per_page: take, // enviado como parametro
      total: count, // count retornado da query builder
      current_page: page, //enviado como parametro
      data: roles // retornado da query builder
    }

    return result
  }

  // quando não encontrar entidade o typeorm retornara null
  async findByname(name: string): Promise<Role | null> {
    // o name é igual o nome do parametro então passo { name } no where do metodo findOneBy (SHORT SINTAX)
    // se o parametro fosse xpto passaria assim {name : xpto} ou seja where name é igual o valor do parametro xpto
    return this.repository.findOneBy({ name }) // não precisa do await quando coloca o return
  }

  async findById(id: string): Promise<Role | null> {
    // o id é igual o nome do parametro então passo { id } no where do metodo findOneBy (SHORT SINTAX)
    // se o parametro fosse xpto passaria assim {id : xpto} ou seja where name é igual o valor do parametro xpto
    return this.repository.findOneBy({ id }) // não precisa do await quando coloca o return
  }
}



import { User } from "@users/entities/User";
import { CreateUserDTO, IUsersRepository, PaginateParams, UsersPaginateProperties } from "./IUsersRepository";
import { Repository } from "typeorm";
import { dataSource } from "@shared/typeorm";

export class UsersRepository implements IUsersRepository {
  // o tipo do repositório vai ser Repository do type orm, que pelo generic '<>' digo qual informação ele lida que é a entidade User
  private repository: Repository<User>

  constructor(){
    // crio o repository através de uma entidade User utilizando uma instancia do datasource
    // o metodo getRepository do datasource retorna o tipo Repository do typeorm assim como foi tipado no atributo privado
    // AQUI É A ATRIBUIÇÃO
    // ESTOU ATRIBUINDO AO REPOSITORIO QUE ELE PERTENCE A ENTIDADE USER (COMO SE FOSSE UMA REPOSITORY DO LARAVEL QUE PERTENCE A UMA MODEL)
    this.repository = dataSource.getRepository(User)
  }


  async create({ name, email, password, isAdmin, role }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      isAdmin,
      role
    })

    // não coloco await pois aqui tenho um retorno direto do save
    return this.repository.save(user)
  }

  // metodo para atualizar um usuario
  async save(user: User): Promise<User> {
    return this.repository.save(user)
  }

  async findAll({ page, skip, take }: PaginateParams): Promise<UsersPaginateProperties> {
    // users e count esta desestruturando nesse array o resultado de getManyAndCount da query feita com query builder
    const [users, count] = await this.repository
      .createQueryBuilder('r') // r = alias para user
      .leftJoinAndSelect('r.role', 'role') //  (r.role é a propriedade role da entidade User e o 'role' é um alias para essa entidade, podendo acessar assim users[0].role.propriedadeDaRole)
      .skip(skip)
      .take(take)
      .getManyAndCount()

      const result = {
        per_page: take,
        total: count,
        current_page: page,
        data: users
      }

      return result
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  async findByName(name: string): Promise<User | null> {
    return this.repository.findOneBy({ name })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async delete(user: User): Promise<void> {
    await this.repository.remove(user)
  }

}

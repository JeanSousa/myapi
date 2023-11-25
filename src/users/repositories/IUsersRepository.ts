import { Role } from "@roles/entities/Role"
import { User } from "@users/entities/User"

export type CreateUserDTO = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  role: Role
}

// definindo um type para paginate params
export type PaginateParams = {
  page: number,
  skip: number, //numero de registros que quero pular
  take: number // quantos registros quero pegar depois que pulei um numero
}

// definindo um type para informações retornadas
export type UsersPaginateProperties = {
  per_page: number,
  total: number,
  current_page: number,
  data: User[] // dados retorna um array de users
}

export interface IUsersRepository {
    // tipar o repository de users que implementar essa interface
    create({ name, email, password, isAdmin, role }: CreateUserDTO): Promise<User>
    save(user: User): Promise<User>
    findAll({
      page,
      skip,
      take
    }: PaginateParams): Promise<UsersPaginateProperties>
    findById(id: string): Promise<User | null>
    findByName(name: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    delete(user: User): Promise<void>
}

// é o data transfrer object

import { Role } from "@roles/entities/Role"

// ele tipa o tipo de informação que deve receber no metodo create para que uma role seja criada
export type CreateRoleDTO = {
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

export interface IRolesRepository{
  // tipa o repository de roles que implementar essa interface
  create({ name }: CreateRoleDTO): Promise<Role>
  save(role: Role): Promise<Role>
  findAll({
    page,
    skip,
    take
  }: PaginateParams): Promise<RolesPaginateProperties>
  findById(id: string): Promise<Role | null>
  findByName(name: string): Promise<Role | null>
  delete(role: Role): Promise<void>
}

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

// fazendo o mapeamento da entidade com decorators para a tabela do banco de dados
// o decorator @Entity('nome tabela mapeada') serve para mostrar que a classe é uma entidade para o type orm
// obs: essa entidade precisa ser importada no arquivo index.ts na instancia do datasource
@Entity('roles')
export class Role {
  // este id é opcional, pois não vai ser informado na instancia
  // decorator @primary column o type orm faz o mapeamento do atributo id com a chave primaria da tabela
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  // create date column é um decorator do typeorm especifico para data de criação
  @CreateDateColumn()
  created_at: Date

  // dessa forma não vai ser criado os valores name e created_at quando instanciar a classe pelo metodo construtor
  // o typescrip não critica pois tenho essa parametro no tsconfig strictPropertyInitialization como false
  constructor() {
    // caso não exista o id
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}



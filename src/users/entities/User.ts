import { Role } from '@roles/entities/Role'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

// fazendo o mapeamento da entidade com decorators para a tabela do banco de dados
// o decorator @Entity('nome tabela mapeada') serve para mostrar que a classe é uma entidade para o type orm (MAPEAMENTO OBJETO RELACIONAL)
// obs: essa entidade precisa ser importada no arquivo index.ts na instancia do datasource
@Entity('users') // COMO SE FOSSE UMA MODEL DO LARAVEL QUE PERTENCE A UMA TABLE
export class User {
  // este id é opcional, pois não vai ser informado na instancia
  // decorator @primary column o type orm faz o mapeamento do atributo id com a chave primaria da tabela
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  isAdmin: boolean

  @Column()
  avatar?: boolean
 // => Role é a entidaque qual esta se relacionando
  @ManyToOne(() => Role, {
    cascade: true, // quando crio um usuario posso definir a role do usuario que ele salvara junto
    // como nesse exemplo
    // const photo2 = new Photo()
    // photo2.url = "me-and-bears.jpg"
    // photo2.user = user
    // await dataSource.manager.save(photo2)
  })
  role: Role // o nome role o typeorm ja entende que a chave estrangeira será roleId, e é do tipo role entity

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

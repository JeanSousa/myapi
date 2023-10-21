import { v4 as uuidv4 } from 'uuid'

export class Role {
  // este id é opcional, pois não vai ser informado na instancia
  id?: string
  name: string
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

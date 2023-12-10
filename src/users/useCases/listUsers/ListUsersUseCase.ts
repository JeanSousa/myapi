import { inject, injectable } from "tsyringe"
import { IUsersRepository, UsersPaginateProperties } from "@users/repositories/IUsersRepository"

// tipando uma entrada para o metodo execute do use case
type ListUsersUseCaseParams = {
    page: number
    limit: number
}
  
@injectable()
export class ListUsersUseCase {
    constructor(
      @inject('UsersRepository')
      private usersRepository: IUsersRepository
    ){}
  
    // metodo execute retorna um array de Users
    async execute({ 
        limit, 
        page 
    }: ListUsersUseCaseParams): Promise<UsersPaginateProperties> {
      // take é a quantidade de registros que vou pegar
      const take = limit
  
      const skip = (Number(page - 1)) * take
  
      return this.usersRepository.findAll({ page, skip, take })
    }
}
  
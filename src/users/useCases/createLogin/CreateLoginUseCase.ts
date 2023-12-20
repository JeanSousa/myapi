import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { jwtConfig } from "@config/auth"
import { AppError } from "@shared/errors/AppError"
import { User } from "@users/entities/User"
import { IUsersRepository } from "@users/repositories/IUsersRepository"
import { sign } from "jsonwebtoken"

// dto criado para esse caso de uso 
type CreateLoginDTO = {
    email: string 
    password: string 
}

// tipagem para retornar o usuário e o token
type IResponse = {
    user: User
    token: string
}


@injectable()
export class CreateLoginUseCase {
    constructor( 
        @inject('UsersRepository') private usersRepository: IUsersRepository
    ){}

    async execute({
        email,
        password
    }: CreateLoginDTO): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        const passwordConfirmed = await compare(password, user.password)

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        // primeiro parametro do sigin é o payload
        // segundo parametro a secret
        // terceiro parametro é um objeto de opções onde uso um padrao do metodo sign do jwt
        // uso o subject que mostra quem esta criando o token (uso o id do usuario)
        // tambem uso o expires in mostrando quando o token ira expirar
        const token = sign(
            {},
            jwtConfig.secret,
            { 
                subject: user.id,
                expiresIn: jwtConfig.expiresIn,
            } 
        )

        return {
            user,
            token
        }
    }

}
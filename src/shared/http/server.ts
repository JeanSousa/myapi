import 'dotenv/config' //importacao da lib dotenv para utilizar variaveis de ambiente
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { routes } from './routes'
import { AppError } from '@shared/errors/AppError'

//criando instancia da aplicação
const app = express()

// Habilitando cors para aceitar conexao de qualquer origem
app.use(cors())

// informando para o express validar informações com formato json
app.use(express.json())

// usando as rotas
app.use(routes)

// criação de um middleware de error que captura o error depois da chamada da rota
app.use(
  // a middleware de erro leva o primeiro parametro error
  // todos os parametros sao tipados pelos tipos importados do express
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      // pego o status code que é attribute da classe AppError
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    console.log(error)

    // Quando não for uma instancia de AppError ira retornar error 500
    // pois se não tiver mapeado com a minha classe de AppError é um erro de aplicação
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

// uso variavel de ambiente utilizando a variavel global 'process' . 'env' . 'nome variavel de ambiente'
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}!`)
})

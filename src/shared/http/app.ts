// Arquivo que tem tudo do express
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express' //importando o swagger
import cors from 'cors'
import { errors } from 'celebrate' //importando o middleware que o celebrate disponibiliza quando detecta erros executado logo apos a execução das rotas
import { routes } from './routes'
import { AppError } from '@shared/errors/AppError'
import swaggerFile from '../../swagger.json'


//criando instancia da aplicação
const app = express()

// Habilitando cors para aceitar conexao de qualquer origem
app.use(cors())

// informando para o express validar informações com formato json
app.use(express.json())

// uso a rota /docs, para servir o swagger, passo o setup de configuração (arquivo json criado)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// usando as rotas
app.use(routes)

// executando o middleware de erros de validação do celebrate que interrompe caso tenha erros nas validações
app.use(errors())

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

export { app }

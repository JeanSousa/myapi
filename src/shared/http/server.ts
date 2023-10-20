import 'dotenv/config' //importacao da lib dotenv para utilizar variaveis de ambiente
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { routes } from './routes'

//criando instancia da aplicação
const app = express()

// Habilitando cors para aceitar conexao de qualquer origem
app.use(cors())

// informando para o express validar informações com formato json
app.use(express.json())

// usando as rotas
app.use(routes)

// uso variavel de ambiente utilizando a variavel global 'process' . 'env' . 'nome variavel de ambiente'
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}!`)
})

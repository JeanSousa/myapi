import express from 'express'
import 'express-async-errors'
import cors from 'cors'

//criando instancia da aplicação
const app = express()

// Habilitando cors para aceitar conexao de qualquer origem
app.use(cors())

// informando para o express validar informações com formato json
app.use(express.json())

app.get('/', (request, response) => {
  return response.json({
    message: 'Ola Dev!',
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000!')
})

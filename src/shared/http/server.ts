import 'dotenv/config' //importacao da lib dotenv para utilizar variaveis de ambiente
// Importando reflect metadata para estar apto a criar o arquivo de instancia do banco de dados sqlite usando typeorm
import 'reflect-metadata'
// importando tudo referente ao express
import { app } from './app'
// importando a classe que faz conexao com banco de dados
import { dataSource } from '@shared/typeorm'

// .initialize é uma promisse e quando isso for resolvido tenho o then que vai servir a aplicação com app.listen
dataSource.initialize().then(() => {
  // uso variavel de ambiente utilizando a variavel global 'process' . 'env' . 'nome variavel de ambiente'
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`)
  })
})

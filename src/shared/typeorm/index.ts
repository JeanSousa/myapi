//instancia do datasource com a conexao do banco de dados
import { DataSource } from "typeorm"

// vou chamar essa função no arquivo principal server.ts para se conectar no banco quando a aplicação subir
const dataSource = new DataSource({
    // sqlite é um banco em arquivo então não precisara de host, port, username e password
    type: "sqlite",
    database: "./db.sqlite", //vai criar o arquivo na raiz do projeto
    // informando as entidades que vou trabalhar
    entities: [],
    migrations: []
})

export { dataSource }

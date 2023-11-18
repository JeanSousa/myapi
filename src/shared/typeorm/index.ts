//instancia do datasource com a conexao do banco de dados
import { DataSource } from "typeorm"
import { CreateRolesTable1698455439958 } from "./migrations/1698455439958-CreateRolesTable"
import { CreateUsersTable1700324058467 } from "./migrations/1700324058467-CreateUsersTable"
import { Role } from "@roles/entities/Role"

// vou chamar essa função no arquivo principal server.ts para se conectar no banco quando a aplicação subir
const dataSource = new DataSource({
    // sqlite é um banco em arquivo então não precisara de host, port, username e password
    type: "sqlite",
    database: "./db.sqlite", //vai criar o arquivo na raiz do projeto
    // informando as entidades que vou trabalhar
    entities: [Role],
    migrations: [ // nas migrations tenho as classes das migrations criadas
      CreateRolesTable1698455439958,
      CreateUsersTable1700324058467
    ]
})

export { dataSource }

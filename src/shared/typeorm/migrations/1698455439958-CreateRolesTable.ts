import { query } from "express"
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRolesTable1698455439958 implements MigrationInterface {
    // parametro queryRunner do typeorm atraves dele criamos as operações no banco de dados
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'string',
            isUnique: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('roles')
    }

}

import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddRoleIdToUsersTable1700325025264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'roleId',
        type: 'uuid',
        isNullable: true, // posso ter um usuario sem nenhuma role atribuida
      }))

      await queryRunner.createForeignKey('users', new TableForeignKey({
        name: 'UsersRoles', // name uso users roles porque estou relacionando a tabela de users com a tabela roles
        columnNames: ['roleId'],
        referencedTableName: 'roles', // com qual tabela vou relacionar
        referencedColumnNames: ['id'], // com qual coluna da tabela roles vou me relacionar
        onDelete: 'SET NULL', //se deletar o id da roles vai setar null nesse campo roleId
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('users', 'UsersRoles')
      await queryRunner.dropColumn('users', 'roleId')
    }

}

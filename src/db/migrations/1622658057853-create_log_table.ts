import {MigrationInterface, QueryRunner} from "typeorm";

export class createLogTable1622658057853 implements MigrationInterface {
    name = 'createLogTable1622658057853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `log` (`id` int NOT NULL AUTO_INCREMENT, `operation_type` varchar(255) NOT NULL, `object_type` varchar(255) NOT NULL, `data` text NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `log`");
    }

}

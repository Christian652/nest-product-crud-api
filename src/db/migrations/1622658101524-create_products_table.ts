import {MigrationInterface, QueryRunner} from "typeorm";

export class createProductsTable1622658101524 implements MigrationInterface {
    name = 'createProductsTable1622658101524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `products` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NOT NULL, `unitPrice` decimal(5,2) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `products`");
    }

}

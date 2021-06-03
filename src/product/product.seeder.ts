import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductSeeder implements Seeder {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository
  ) { }

  async seed(): Promise<any> {
    try {
      return await this.productRepository.insertMany([
        {
          name: "Calça Cintura Alta",
          description: "uma peça de roupa bem casual",
          unitPrice: 80.50
        },
        {
          name: "Calça Jeans",
          description: "uma peça de roupa classica bem jovem",
          unitPrice: 90.50
        },
        {
          name: "Calça de Malha Fina",
          description: "uma peça de roupa bem fina",
          unitPrice: 70.50
        },
        {
          name: "Sapatenis",
          description: "sapato estranho que não se encaixa em nada",
          unitPrice: 120.00
        },
        {
          name: "Tenis",
          description: "sapato perfeito para corridas",
          unitPrice: 100.50
        },
        {
          name: "Boné",
          description: "chapeu atemporal",
          unitPrice: 40.50
        },
        {
          name: "Alparcata",
          description: "sapato perfeito para situações casuais",
          unitPrice: 120.50
        },
        {
          name: "Regata",
          description: "Blusa Esportiva , ideal para academia",
          unitPrice: 20.50
        },
        {
          name: "Blusa Social",
          description: "Blusa mais seria para situações festivas",
          unitPrice: 40.50
        },	
      ]);  
    } catch (error) {}
  }

  async drop(): Promise<any> {
    try {
      const product = await this.productRepository.find();
      await this.productRepository.remove(product);
    } catch (error) {}
  }
}
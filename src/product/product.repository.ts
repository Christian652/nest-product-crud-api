import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  public async saveProduct(
    productDto: ProductDTO,
  ): Promise<Product> {
    const { id, name, unitPrice, description } = productDto;

    const Product_ = new Product();
    Product_.id = id ? id : null;
    Product_.name = name;
    Product_.description = description;
    Product_.unitPrice = unitPrice;

    await Product_.save();

    return Product_;
  }


}
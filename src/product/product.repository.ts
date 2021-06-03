import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';
import { GetProductFilterDTO } from './dto/getProducts.filter.dto';

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

    return (await Product_.save());
  }

  public async getAll(parameters: GetProductFilterDTO) {
    const { orderBy, sort, like, page, limit } = parameters;

    const query = this.createQueryBuilder('products');

    if (like) 
      query.andWhere(
        'products.name LIKE :like OR products.description LIKE :like OR products.unitPrice LIKE :like', 
        {like: `%${like}%`}
      );
    
    if (limit) {
      query.limit(limit);
      
      if (page) 
        this.paginate(page, limit, query)
    }

    if (orderBy) 
      if (sort) {
        query.orderBy(orderBy, sort);
      } else {
        query.orderBy(orderBy)
      }
    
    return await query.getMany();
  }

  public async insertMany(values) {
    await this.createQueryBuilder('product')
      .insert()
      .values(values)
      .execute();
  }

  public paginate(page, limit, query) {
    query.offset((page - 1) * limit)
  }
}
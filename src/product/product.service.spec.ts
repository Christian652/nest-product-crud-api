import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let driverService;
  let driverRepository;

  const mockProductRepository = () => ({
    saveProduct: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useFactory: mockProductRepository,
        },
      ],
    }).compile();
    driverService = await module.get<ProductService>(ProductService);
    driverRepository = await module.get<ProductRepository>(ProductRepository);
  });

  describe('createProduct', () => {
    it('should save a driver in the database', async () => {
      driverRepository.saveProduct.mockResolvedValue('someProduct');
      expect(driverRepository.saveProduct).not.toHaveBeenCalled();
      
      const createProductDto = {
        name: 'driver name',
        cpf: '234.625.626-54',
        contact: 'sample text',
      };
      
      const result = await driverService.saveProduct(createProductDto);
     
      expect(driverRepository.saveProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual('someProduct');
    });
  });

  describe('getProducts', () => {
    it('should get all drivers', async () => {
      driverRepository.find.mockResolvedValue('someProducts');
      expect(driverRepository.find).not.toHaveBeenCalled();
      const result = await driverService.getProducts();
      expect(driverRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someProducts');
    });
  });

  describe('getProduct', () => {
    it('should retrieve a driver with an ID', async () => {
      const mockProduct = {
        name: 'driver name',
        cpf: '234.625.626-54',
        contact: 'sample text',
      };

      driverRepository.findOne.mockResolvedValue(mockProduct);
      
      const result = await driverService.getProduct(1);
      
      expect(result).toEqual(mockProduct);
      expect(driverRepository.findOne).toHaveBeenCalledWith(1, {"relations": ["contact"]});
    });

    it('throws an error as a driver is not found', () => {
      driverRepository.findOne.mockResolvedValue(null);
      expect(driverService.getProduct(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProduct', () => {
    it('should delete driver', async () => {
      driverRepository.delete.mockResolvedValue(1);
      expect(driverRepository.delete).not.toHaveBeenCalled();
      await driverService.deleteProduct(1);
      expect(driverRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
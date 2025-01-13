import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  AccessControlCreateOne,
  AccessControlReadMany,
  AccessControlReadOne,
  AccessControlUpdateOne,
} from '@concepta/nestjs-access-control';
import {
  CrudController,
  CrudJoin,
  CrudReadMany,
  CrudRequest,
  CrudRequestInterface,
  CrudReadOne,
  CrudCreateOne,
  CrudBody,
  CrudUpdateOne,
} from '@concepta/nestjs-crud';
import {
  ProductCreateDto,
  ProductDto,
  ProductPaginatedDto,
  ProductUpdateDto,
} from 'rockets-playground-common';
import { ProductCrudService } from './product-crud.service';
import { ProductResource } from './product.types';

@ApiBearerAuth()
@ApiTags(ProductResource.One)
@CrudController({
  path: ProductResource.One,
  model: {
    type: ProductDto,
    paginatedType: ProductPaginatedDto,
  },
})
export class ProductController {
  constructor(private readonly productCrudService: ProductCrudService) {}

  @CrudJoin({
    store: {
      eager: true,
    },
  })
  @CrudReadMany()
  @AccessControlReadMany(ProductResource.Many)
  async getMany(@CrudRequest() crudRequest: CrudRequestInterface) {
    return this.productCrudService.getMany(crudRequest);
  }

  @CrudJoin({
    store: {
      eager: true,
    },
  })
  @CrudReadOne()
  @AccessControlReadOne(ProductResource.One)
  async getOne(@CrudRequest() crudRequest: CrudRequestInterface) {
    return this.productCrudService.getOne(crudRequest);
  }

  @CrudCreateOne()
  @AccessControlCreateOne(ProductResource.One)
  async createOne(
    @CrudRequest() crudRequest: CrudRequestInterface,
    @CrudBody()
    productCreateDto: ProductCreateDto,
  ) {
    return this.productCrudService.createOne(crudRequest, productCreateDto);
  }

  @CrudUpdateOne()
  @AccessControlUpdateOne(ProductResource.One)
  async updateOne(
    @CrudRequest() crudRequest: CrudRequestInterface,
    @CrudBody()
    productUpdateDto: ProductUpdateDto,
  ) {
    return this.productCrudService.updateOne(crudRequest, productUpdateDto);
  }
}

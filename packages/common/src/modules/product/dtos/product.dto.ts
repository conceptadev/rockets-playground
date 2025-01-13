import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonEntityDto } from '@concepta/nestjs-common';
import { ProductInterface } from '../interfaces/product.interface';
import { StoreInterface } from '../../store/interfaces/store.interface';
import { StoreDto } from '../../store/dtos/store.dto';

@Exclude()
export class ProductDto extends CommonEntityDto implements ProductInterface {
  @Expose()
  @ApiProperty({
    title: 'Product name',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty({
    title: 'Product name',
    type: 'string',
  })
  @IsPositive()
  @IsNumber()
  price: number;

  @Expose()
  @ApiProperty({
    title: 'Stock',
    type: 'string',
  })
  @Min(0)
  @IsInt()
  stock: number;

  @Expose()
  @ApiPropertyOptional({
    title: 'Description',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @ApiPropertyOptional({
    title: 'Image URL',
    type: 'string',
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @Expose()
  @ApiPropertyOptional({
    title: 'Active',
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  // Relations
  @Expose()
  @ApiProperty({ type: 'string', description: 'Store ID' })
  @IsUUID()
  storeId: string;

  @Expose()
  @ApiPropertyOptional({
    type: () => StoreDto,
    title: 'Store',
  })
  @Type(() => StoreDto)
  @IsOptional()
  store?: StoreInterface;
}

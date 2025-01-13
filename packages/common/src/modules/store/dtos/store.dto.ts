import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonEntityDto } from '@concepta/nestjs-common';
import { StoreInterface } from '../interfaces/store.interface';
import { ProductDto } from '../../product/dtos/product.dto';
import { ProductInterface } from '../../product/interfaces/product.interface';

@Exclude()
export class StoreDto extends CommonEntityDto implements StoreInterface {
  @Expose()
  @ApiProperty({
    title: 'Store name',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty({
    title: 'Store email',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Expose()
  @ApiProperty({
    title: 'Store Phone Number',
    type: 'string',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @Expose()
  @ApiProperty({
    title: 'Address',
    type: 'string',
  })
  @IsString()
  address: string;

  @Expose()
  @ApiPropertyOptional({
    title: 'description',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @ApiPropertyOptional({
    title: 'city',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @Expose()
  @ApiPropertyOptional({
    title: 'state',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  state?: string;

  @Expose()
  @ApiPropertyOptional({
    title: 'state',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional({
    title: 'openingTime',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Invalid time format (HH:MM:SS)',
  })
  openingTime?: string;

  @ApiPropertyOptional({
    title: 'closingTime',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Invalid time format (HH:MM:SS)',
  })
  closingTime?: string;

  @Expose()
  @ApiPropertyOptional({
    title: 'active',
    type: 'string',
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @Expose()
  @ApiPropertyOptional({
    type: () => ProductDto,
    title: 'Molecule Calculations',
    isArray: true,
  })
  @Type(() => ProductDto)
  @IsOptional()
  products?: ProductInterface[];
}

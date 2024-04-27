import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PostFilterDto {

  @IsOptional()
  title: string;

  @IsOptional()
  description: string;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  current?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortDescending?: boolean;
}

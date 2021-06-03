import { IsInt, IsOptional, IsString } from "class-validator";

export class GetProductFilterDTO {

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsString()
  sort: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  like: string;

  @IsOptional()
  @IsInt()
  limit: number;

  @IsOptional()
  @IsInt()
  page: number;

}
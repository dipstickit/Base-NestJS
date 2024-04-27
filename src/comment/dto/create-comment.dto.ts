import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  topicId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  createdBy: number;
}

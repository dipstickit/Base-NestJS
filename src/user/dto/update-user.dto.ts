import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './createUserDto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['email'] as const) {
  @IsOptional()
  password: string;
}

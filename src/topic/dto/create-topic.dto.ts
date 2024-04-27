import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateTopicDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

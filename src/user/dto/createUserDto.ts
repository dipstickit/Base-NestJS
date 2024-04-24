import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsNumberString()
    phone: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {

}

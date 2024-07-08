import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import Address from "../entity/address.entity"
import { CreateAddressDto} from "./address.dto"
import "reflect-metadata"
import { Type } from "class-transformer"
import { Role } from "../utils/role.enum"

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsNumber()
    age:number

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=> CreateAddressDto)
    address: CreateAddressDto

    @IsNotEmpty()
    @IsString()
    password : String;

    @IsNotEmpty()
    @IsEnum(Role)
    role:Role;


}
export class UpdateEmployeeDto{
    @IsOptional()
    @IsString()
    name:string

    @IsOptional()
    @IsEmail()
    email:string

    @IsOptional()
    @IsNumber()
    age:number

    @IsOptional()
    @ValidateNested({each:true})
    @Type(()=> CreateAddressDto)
    address: CreateAddressDto

    @IsOptional()
    @IsString()
    password : String;

    @IsOptional()
    @IsEnum(Role)
    role:Role;


}

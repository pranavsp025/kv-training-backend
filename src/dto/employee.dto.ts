import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import Address from "../entity/address.entity"
import { CreateAddressDto} from "./address.dto"
import "reflect-metadata"
import { Type } from "class-transformer"
import { Role } from "../utils/role.enum"

export class CreateEmployeeDto{
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

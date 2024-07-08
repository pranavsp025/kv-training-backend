import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateDepartmentDto {

    @IsNotEmpty()
    @IsString()
    department_name:string

}

export class UpdateDepartmentDto{
    
    @IsOptional()
    @IsString()
    department_name:string
}
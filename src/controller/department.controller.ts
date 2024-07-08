import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exceptions";
import EmployeeService from "../service/employee.service";
import express from "express";
import { CreateEmployeeDto} from "../dto/employee.dto";
import { validate } from "class-validator";
import { NextFunction } from "express-serve-static-core";
import authorize from "../middleware/authorization.middleware";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import DepartmentService from "../service/department.services";
import { CreateDepartmentDto } from "../dto/department.dto";
class DepartmentController{
    public router: express.Router;
    constructor(private departmentService: DepartmentService) {
        this.router = express.Router();

        this.router.get("/",this.getAllDepartments);
        this.router.get("/:id",this.getDepartmentById);
        this.router.post("/", this.createDepartment);
        this.router.put("/:id",this.updateDepartment);
        this.router.delete("/:id",this.deleteDepartment);

    }
    public getAllDepartments = async(req:express.Request, res:express.Response) => {
        const departments = await this.departmentService.getAllDepartments();
        res.status(200).send(departments);
    }
    public getDepartmentById = async(req:express.Request, res:express.Response,next:express.NextFunction) => {
        try{
            const departments = await this.departmentService.getDepartmentById(Number(req.params.id));
            if(!departments){
                const error = new HttpException(404,`No employee with ID: ${req.params.id}`);
                throw error;
            }
            res.status(200).send(departments);
        }
        catch(err){
            next(err);
        }
        
    }
    
    
    public createDepartment = async(req:RequestWithUser, res:express.Response,next:express.NextFunction) => {
        try{
            const role=req.body.role;
            // if(role!==Role.HR){
            //     throw new HttpException(403,"You are not authorized to create Employee");
            //     // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
            // }
            const departmentDto = plainToInstance(CreateDepartmentDto,req.body);
            const errors = await validate(departmentDto);
            if(errors.length){
                console.log(JSON.stringify(errors));
                throw new HttpException(400,JSON.stringify(errors));
            }
            const department = await this.departmentService.createDepartment(req.body);
            res.status(201).send(department);
        }
        catch(err){
            next(err);
        }
    }
    public updateDepartment = async(req:express.Request, res:express.Response,next:express.NextFunction) => {
        try{
            const departmentDto = plainToInstance(CreateDepartmentDto,req.body);
            const errors = await validate(departmentDto);
            if(errors.length){
                console.log(JSON.stringify(errors));
                throw new HttpException(400,JSON.stringify(errors));
            }
        const departments = await this.departmentService.updateDepartment(Number(req.params.id),req.body);
        res.status(200).send(departments);
        }
        catch(err){
            next(err);
        }
    }
    public deleteDepartment = async(req:express.Request, res:express.Response,next:express.NextFunction) => {
        try{
            if(!req.params.id){
                const error = new HttpException(404,`No employee with ID: ${req.params.id}`);
                throw error;
            }
        const departments = await this.departmentService.delete(Number(req.params.id));
        res.status(204).send(departments);
        }
        catch(err){next(err);}
    }


}

export default DepartmentController;
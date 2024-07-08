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
class EmployeeController{
    public router: express.Router;
    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        this.router.get("/",this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeById);
        this.router.post("/", this.createEmployee);
        // this.router.post("/",authorize, this.createEmployee);

        this.router.put("/:id",this.updateEmployee);
        this.router.delete("/:id",this.deleteEmployee);
        this.router.post("/login",this.loginEmployee);

    }
    public getAllEmployees = async(req:express.Request, res:express.Response) => {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }
    public getEmployeeById = async(req:express.Request, res:express.Response,next:express.NextFunction) => {
        try{
            const employees = await this.employeeService.getEmployeeById(Number(req.params.id));
            if(!employees){
                const error = new HttpException(404,`No employee with ID: ${req.params.id}`);
                throw error;
            }
            res.status(200).send(employees);
        }
        catch(err){
            next(err);
        }
        
    }
    
    public createEmployee = async(req:RequestWithUser, res:express.Response,next:express.NextFunction) => {
        try{
            const role=req.body.role;
            // if(role!==Role.HR){
            //     throw new HttpException(403,"You are not authorized to create Employee");
            //     // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
            // }
            const employeeDto = plainToInstance(CreateEmployeeDto,req.body);
            const errors = await validate(employeeDto);
            if(errors.length){
                console.log(JSON.stringify(errors));
                throw new HttpException(400,JSON.stringify(errors));
            }
            const employee = await this.employeeService.createEmployee(req.body,req.body.address);
            res.status(201).send(employee);
        }
        catch(err){
            next(err);
        }
    }
    public updateEmployee = async(req:express.Request, res:express.Response,next:express.NextFunction) => {
        try{
            const employeeDto = plainToInstance(CreateEmployeeDto,req.body);
            const errors = await validate(employeeDto);
            if(errors.length){
                console.log(JSON.stringify(errors));
                throw new HttpException(400,JSON.stringify(errors));
            }
        const employees = await this.employeeService.updateEmployee(Number(req.params.id),req.body);
        res.status(200).send(employees);
        }
        catch(err){
            next(err);
        }
    }
    public deleteEmployee = async(req:express.Request, res:express.Response,next:express.NextFunction) => {
        try{
            if(!req.params.id){
                const error = new HttpException(404,`No employee with ID: ${req.params.id}`);
                throw error;
            }
        const employees = await this.employeeService.delete(Number(req.params.id));
        res.status(204).send(employees);
        }
        catch(err){next(err);}
    }

    public loginEmployee = async (req:express.Request, res:express.Response, next:NextFunction) => {
        const { email,password} = req.body;
        try{
            const token = await this.employeeService.loginEmployee(email,password);
            res.status(200).send({data:token});
        }
        catch(err){
            next(err);
        }
    };

}

export default EmployeeController;
import { when } from "jest-when";
import Employee from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository"
import EmployeeService from "../../src/service/employee.service";
import HttpException from "../../src/exceptions/http.exceptions";
describe ('Employee Service', () =>{
    let employeeRepository:EmployeeRepository;
    let employeeService:EmployeeService;

    beforeAll(()=>{
        const dataSource = {
            getRepository:jest.fn()
        };
        employeeRepository=new EmployeeRepository(dataSource.getRepository(Employee))as jest.Mocked<EmployeeRepository>;
        employeeService = new EmployeeService(employeeRepository);
    })

    it('should return allEmploees',async () =>{
        const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
        employeeRepository.find = mock;
        const users = await employeeService.getAllEmployees();
        expect(users).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);

    })
    it('should return employee by id',async () =>{
        const mock = jest.fn();
        when(mock).calledWith({id:1}).mockResolvedValue({id:1,"name":"sample"}as Employee);
        employeeRepository.findOneBy = mock;
        const users = await employeeService.getEmployeeById(1);
        expect(users.name).toEqual("sample");
        expect(mock).toHaveBeenCalledTimes(1);

    })
    it('should throw exception', async() => {
        const mockedFunction = jest.fn();
        when(mockedFunction).mockResolvedValue(null);
        employeeRepository.findOneBy = mockedFunction;
        await expect(employeeService.loginEmployee('nonexistent@example.com', 'password'))
        .rejects
        .toThrow(HttpException);
    })
})
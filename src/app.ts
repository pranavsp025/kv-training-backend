const express = require("express");

import {Request,Response} from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
import HttpException from "./exceptions/http.exceptions";
import errorMiddleware from "./middleware/error.middleware";
                                         
const server = new express();       

server.use(bodyParser.json());
server.use(loggerMiddleware);    
server.use('/employee', employeeRouter);

server.use(errorMiddleware);

server.get('/', (req:Request, res:Response) => {
    console.log(req.url);                 
    res.status(200).send("Hello World");
});                            

(async () => {
    try {
        await dataSource.initialize();
    } catch (e) {
        console.log("Failed", e);
        process.exit(1);
    }
    server.listen(3000, () => {
        console.log("server listening to 3000");
    });
})();

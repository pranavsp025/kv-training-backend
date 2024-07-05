import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exceptions";

const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (error instanceof HttpException) {
            const status: number = error.status || 400;
            const message: string = "Validation Failed";
            // const errors: string[] = error.errors || []; 
            let respbody = {
                error: message,
                statusCode: status,
                errors: [error.message] 
                // errors.length ? errors : ["address should not be empty", "name should not be empty", "email must be an email"]
            };
            res.status(status).json(respbody);
        } else {
            console.error(error.stack);
            res.status(500).send({
                error: "Something went wrong",
                statusCode: 500,
                errors: [error.message]
            });
        }
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;

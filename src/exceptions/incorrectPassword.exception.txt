import HttpException from "./http.exceptions";
import {CustomError} from "../utils/error.code";

class IncorrectPasswordException extends HttpException {
    constructor(error:CustomError) {
        super(401,error.MESSAGE);
    }
}

export default IncorrectPasswordException;
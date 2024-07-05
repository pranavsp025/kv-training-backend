

class HttpException extends Error {

    public status: number;
    error: any[];
    errors: any[];
    constructor(status: number, message: string){
        super(message);
        this.status = status;
    }

}

export default HttpException;
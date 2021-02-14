export interface ResponseError {
    response: {
        data: {
            message: string;
            status: string;
            error: string;
        }
    }

}
export const createError = (message: string, statusCode = 500) => {
    const err: any = new Error(message);
    err.status = statusCode;
    return err;
};

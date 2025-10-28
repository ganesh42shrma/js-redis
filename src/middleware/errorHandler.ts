import { Request, Response, NextFunction } from "express";

//custom interface for typed errors

interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(`❌ Error: ${err.message}`);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500 ? "Internal Server Error" : err.message || "Something went wrong",
    });
};
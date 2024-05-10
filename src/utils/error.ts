import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

interface Error {
    code: number;
    message?: string;
    name?: string;
    stack?: string;
}
export const error404Handler = (req: Request, res: Response) => {
    res.status(404).json({
        code: 404,
        message: "Not Found",
    });
};

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(chalk.red("================== ERROR ====================="))
    console.error(chalk.bgGreen.bold.black('Error Name=======>'), err?.name);
    console.error(chalk.bgMagenta.bold.black('Message=========>'), err?.message);
    console.error(chalk.bgRed.bold.black('Error-Stack ========>'), err?.stack);
    const statusCode = err?.code || 500;
    const errorMessage = err.message ? err.message : "Internal Server Error";
    res.status(statusCode).json({
        code: statusCode,
        errorName: err?.name,
        message: errorMessage,
        error: err?.stack
    });
};

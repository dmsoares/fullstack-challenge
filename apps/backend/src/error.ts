import { RequestHandler } from 'express';
import { CoreError, DomainErrorTag, ServiceErrorTag } from './core';

export abstract class APIError extends Error {
    abstract readonly tag: APIErrorTag;
}
type APIErrorTag = 'MalformedRequestError';

export class MalformedRequestError extends APIError {
    readonly tag = 'MalformedRequestError';
}

type ErrorTag = DomainErrorTag | ServiceErrorTag | APIErrorTag;
export const ErrorMap: Record<ErrorTag, number> = {
    ValidationError: 400,
    NotFoundError: 404,
    MalformedRequestError: 400
};

export const withErrorHandling =
    (handler: RequestHandler): RequestHandler =>
    async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            if (err instanceof CoreError || err instanceof APIError) {
                res.status(ErrorMap[err.tag]).json({ error: err.message });
                return;
            }
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

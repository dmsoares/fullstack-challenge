abstract class DomainError extends Error {
    abstract readonly tag: ErrorTag;
}

export class ValidationError extends DomainError {
    readonly tag = 'ValidationError';
}

export type ErrorTag =
    | 'ValidationError'

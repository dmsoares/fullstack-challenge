import { CoreError } from '../error';

export class ValidationError extends CoreError {
    readonly tag = 'ValidationError';
}

export type DomainErrorTag = 'ValidationError';

import { CoreError } from '../error';

export class NotFoundError extends CoreError {
    readonly tag = 'NotFoundError';
}

export type ServiceErrorTag = 'NotFoundError';

import { DomainErrorTag } from './domain';
import { ServiceErrorTag } from './services';

export abstract class CoreError extends Error {
    abstract readonly tag: DomainErrorTag | ServiceErrorTag;
}

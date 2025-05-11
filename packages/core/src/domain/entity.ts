import { Identifier } from './value-objects';

export interface Entity<T> {
    id: Identifier<T>;
}

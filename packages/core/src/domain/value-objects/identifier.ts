import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import { ValueObject } from '../value-object';
import { ValidationError } from '../error';

export abstract class Identifier<T> implements ValueObject<Identifier<T>> {
    abstract readonly tag: string;
    protected constructor(readonly value: string) {}

    sameValueAs(other: Identifier<T>): boolean {
        return this.value === other.value;
    }
}

export class SongIdentifier extends Identifier<SongIdentifier> {
    readonly tag = 'song-identifier';

    private constructor(id: string) {
        super(id);
    }

    static create(id: string): SongIdentifier {
        if (!validateUUID(id)) {
            throw new ValidationError('invalid uuid');
        }
        return new SongIdentifier(id);
    }

    static generate(): SongIdentifier {
        return SongIdentifier.create(uuidv4());
    }
}

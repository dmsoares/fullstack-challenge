import { ValidationError } from "../error";
import { ValueObject } from "../value-object";

interface SongNameProps {
  name: string;
}

export class SongName implements ValueObject<SongName> {
  private constructor(readonly name: string) {}

  static create({name}: SongNameProps): SongName {
    if (!name) throw new ValidationError('Song name cannot be empty');
    if (name.length > 100) throw new ValidationError('Song name cannot be longer than 100 characters');

    return new SongName(name);
  }

  sameValueAs(other: SongName): boolean {
    return this.name === other.name;
  }
}

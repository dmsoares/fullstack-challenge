import { ValidationError } from "../error";
import { ValueObject } from "../value-object";

interface SongArtistProps {
  name: string;
}

export class SongArtist implements ValueObject<SongArtist> {
  private constructor(readonly name: string) {}

  static create({name}: SongArtistProps): SongArtist {
    if (!name) throw new ValidationError('Song artist cannot be empty');
    if (name.length > 100) throw new ValidationError('Song artist cannot be longer than 100 characters');

    return new SongArtist(name);
  }

  sameValueAs(other: SongArtist): boolean {
    return this.name === other.name;
  }
}

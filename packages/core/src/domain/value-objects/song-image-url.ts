import { ValueObject } from "../value-object";

interface SongImageUrlProps {
  url: string;
}

export class SongImageUrl implements ValueObject<SongImageUrlProps> {
  private constructor(readonly url: string) {}

  static create({url}: SongImageUrlProps): SongImageUrl {
    return new SongImageUrl(url);
  }

  sameValueAs(other: SongImageUrl): boolean {
    return this.url === other.url;
  }
}

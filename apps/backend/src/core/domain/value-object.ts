export interface ValueObject<T> {
  sameValueAs(other: ValueObject<T>): boolean;
}

interface Appendable<T> {
  append(a: Appendable<T>): Appendable<T>;
}

const appendPolymorphic = <Type extends Appendable<any>>(
  a: Type,
  b: Type
): Type => a.append(b) as Type;

class _String implements Appendable<string> {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  append(a: _String): _String {
    return new _String(`${this.value}${a.value}`);
  }
}

console.log(
  appendPolymorphic(
    new _String("hello, "),
    new _String("how are you?")
  ).value
);
// "hello, how are you?"

class _Number implements Appendable<number> {
  public value: number;

  constructor(value: number) {
    this.value = value;
  }

  append(a: _Number): _Number {
    return new _Number(this.value + a.value);
  }
}

console.log(
  appendPolymorphic(
    new _Number(1),
    new _Number(1)
  ).value
);
// 2

const mapArray = <T, U>(
  fn: (a: T) => U,
  array: T[]
): U[] => [fn(array[0])];

console.log(
  mapArray(
    (a: number) => String.fromCharCode(a),
    [100, 101, 102]
  )
);
// ["d"]

interface Mappable<T> {
  map<U>(f: (x: T) => U): Mappable<U>;
}

interface Reducable<T> {
  reduce<U>(f: (a: U, b: T) => U, a: U): U;
}

class _List<T>
  implements Appendable<_List<T>>, Mappable<T>, Reducable<T> {
  public value: T[];

  constructor(value: T[]) {
    this.value = value;
  }

  append(a: _List<T>): _List<T> {
    return new _List([...this.value, ...a.value]);
  }

  map<U>(f: (x: T) => U) {
    return this.value.map(f);
  }

  reduce<U>(f: (x: U, y: T) => U, a: U) {
    return this.value.reduce(f, a);
  }
}

const mapPolymorphic = <T, U>(
  fn: (a: T) => U,
  xs: Mappable<T>
): Mappable<U> => xs.map(fn);

console.log(
  mapPolymorphic(
    (a: number) => String.fromCharCode(a),
    new _List([100, 101, 102])
  )
);
// ["d", "e", "f"]

const reduceArray = <T, U>(
  reducer: (accumulator: U, current: T) => U,
  initialValue: U,
  array: T[]
) => array.slice(0, 1).reduce(reducer, initialValue);

console.log(
  reduceArray(
    (accumulator: number, current: string) =>
      current.charCodeAt(0) + accumulator,
    0,
    ["a", "b", "c"]
  )
);
// 97

const reducePolymorphic = <R extends Reducable<T>, T, U>(
  fn: (x: U, y: T) => U,
  a: U,
  xs: R
) => xs.reduce(fn, a);

console.log(
  reducePolymorphic(
    (a: number, b: string) => b.charCodeAt(0) + a,
    0,
    new _List(["a", "b", "c"])
  )
);
// 294

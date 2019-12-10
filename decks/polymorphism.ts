interface Appendable<ElementType> {
  append(
    end: Appendable<ElementType>
  ): Appendable<ElementType>;
}

const appendPolymorphic = <Type extends Appendable<any>>(
  beginning: Type,
  end: Type
): Type => beginning.append(end) as Type;

class _String implements Appendable<string> {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  append(end: _String): _String {
    return new _String(`${this.value}${end.value}`);
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

  append(end: _Number): _Number {
    return new _Number(this.value + end.value);
  }
}

console.log(
  appendPolymorphic(
    new _Number(1),
    new _Number(1)
  ).value
);
// 2

const mapArray = <ElementType, ResultType>(

  // A mapping function
  mapper: (currentElement: ElementType) => ResultType,

  // An array containing data
  array: ElementType[]

): ResultType[] => [mapper(array[0])];

console.log(
  mapArray(
    (
      currentElement: number
    ) => String.fromCharCode(currentElement),
    [100, 101, 102]
  )
);
// ["d"]

interface Mappable<ElementType> {
  map<ResultType>(

    // A mapping function
    mapper: (
      currentElement: ElementType
    ) => ResultType

  ): Mappable<ResultType>;
}

class _List<ElementType> implements Mappable<ElementType> {

  public value: ElementType[];

  constructor(value: ElementType[]) {
    this.value = value;
  }

  map<ResultType>(

    // A mapping function
    mapper: (currentElement: ElementType) => ResultType
  ) {
    return this.value.map(mapper);
  }

}

const mapPolymorphic = <ElementType, ResultType>(
  mapper: (currentElement: ElementType) => ResultType,
  data: Mappable<ElementType>
): Mappable<ResultType> => data.map(mapper);

console.log(
  mapPolymorphic(
    (currentElement: number) => String.fromCharCode(currentElement),
    new _List([100, 101, 102])
  )
);
// ["d", "e", "f"]

const reduceArray = <ElementType, ResultType>(

  // A reducer function
  reducer: (
    accumulator: ResultType,
    currentElement: ElementType
  ) => ResultType,

  // The initial value
  initialValue: ResultType,

  // The array containing data
  array: ElementType[]
) => array.slice(0, 1).reduce(reducer, initialValue);

console.log(
  reduceArray(
    (accumulator: number, currentElement: string) =>
      currentElement.charCodeAt(0) + accumulator,
    0,
    ["a", "b", "c"]
  )
);
// 97

interface Reducable<ElementType> {
  reduce<ResultType>(

    // A reducer function
    reducer: (
      accumulator: ResultType,
      currentElement: ElementType
    ) => ResultType,

    // The initial value
    initialValue: ResultType
  ): ResultType;
}

class _List<ElementType> implements Reducable<ElementType> {

  public value: ElementType[];

  constructor(value: ElementType[]) {
    this.value = value;
  }

  reduce<ResultType>(

    // A reducer function
    reducer: (
      accumulator: ResultType,
      currentElement: ElementType
    ) => ResultType,

    // The initial value
    initialValue: ResultType

  ) {
    return this.value.reduce(reducer, initialValue);
  }
}

const reducePolymorphic = <ElementType, ResultType>(

  // A reducer function
  reducer: (x: ResultType, y: ElementType) => ResultType,

  // The initial value
  initialValue: ResultType,

  // The container containing data
  data: Reducable<ElementType>
) => data.reduce(reducer, initialValue);

console.log(
  reducePolymorphic(

    // A reducer function
    (
      accumulator: number,
      currentElement: string
    ) => currentElement.charCodeAt(0) + accumulator,

    // The initial value
    0,

    // The container containing data
    new _List(["a", "b", "c"])
  )
);
// 294

export function clone<T>(value: T): T {
  // Handle null or undefined
  if (value === null || value === undefined) {
    return value;
  }

  // Handle primitive types (string, number, boolean, symbol, bigint)
  if (typeof value !== "object") {
    return value;
  }

  // Handle Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  // Handle Array
  if (Array.isArray(value)) {
    return value.map((item) => clone(item)) as unknown as T;
  }

  // Handle Map
  if (value instanceof Map) {
    const result = new Map();
    value.forEach((v, k) => {
      result.set(clone(k), clone(v));
    });
    return result as unknown as T;
  }

  // Handle Set
  if (value instanceof Set) {
    const result = new Set();
    value.forEach((v) => {
      result.add(clone(v));
    });
    return result as unknown as T;
  }

  // Handle TypedArray
  if (ArrayBuffer.isView(value) && !(value instanceof DataView)) {
    type TypedArray =
      | Int8Array
      | Uint8Array
      | Uint8ClampedArray
      | Int16Array
      | Uint16Array
      | Int32Array
      | Uint32Array
      | Float32Array
      | Float64Array
      | BigInt64Array
      | BigUint64Array;
    return new (value.constructor as new (source: TypedArray) => typeof value)(
      value as unknown as TypedArray,
    ) as T;
  }

  // Handle ArrayBuffer
  if (value instanceof ArrayBuffer) {
    return value.slice(0) as T;
  }

  // Handle DataView
  if (value instanceof DataView) {
    return new DataView(clone(value.buffer)) as T;
  }

  // Handle Error
  if (value instanceof Error) {
    const ErrorConstructor = value.constructor as new (
      message: string,
    ) => Error;
    const error = new ErrorConstructor(value.message);
    Object.getOwnPropertyNames(value).forEach((prop) => {
      (error as unknown as Record<string, unknown>)[prop] = clone(
        (value as unknown as Record<string, unknown>)[prop],
      );
    });
    return error as T;
  }

  // Handle Promise
  if (value instanceof Promise) {
    return new Promise((resolve, reject) => {
      value.then(
        (res) => resolve(clone(res)),
        (err) => reject(clone(err)),
      );
    }) as unknown as T;
  }

  // Handle Object
  const result: Record<string, unknown> = {};
  Object.keys(value).forEach((key) => {
    result[key] = clone((value as Record<string, unknown>)[key]);
  });
  return result as T;
}

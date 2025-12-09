import { describe, it, expect } from "vitest";
import { transformKeys } from "./transformKeys";

describe("transformKeys", () => {
  it("should transform keys of a flat object", () => {
    const obj = { firstName: "John", lastName: "Doe" };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({ FIRSTNAME: "John", LASTNAME: "Doe" });
  });

  it("should transform keys of nested objects", () => {
    const obj = {
      firstName: "John",
      address: {
        streetName: "Main St",
        cityName: "New York",
      },
    };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({
      FIRSTNAME: "John",
      ADDRESS: {
        STREETNAME: "Main St",
        CITYNAME: "New York",
      },
    });
  });

  it("should transform keys of deeply nested objects", () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            deepKey: "value",
          },
        },
      },
    };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({
      LEVEL1: {
        LEVEL2: {
          LEVEL3: {
            DEEPKEY: "value",
          },
        },
      },
    });
  });

  it("should handle arrays within objects", () => {
    const obj = {
      userName: "John",
      hobbies: ["reading", "coding"],
    };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({
      USERNAME: "John",
      HOBBIES: ["reading", "coding"],
    });
  });

  it("should handle arrays of objects", () => {
    const obj = {
      users: [{ firstName: "John" }, { firstName: "Jane" }],
    };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({
      USERS: [{ firstName: "John" }, { firstName: "Jane" }],
    });
  });

  it("should transform keys using custom function (camelCase to snake_case)", () => {
    const toSnakeCase = (str: string) =>
      str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    const obj = { firstName: "John", lastName: "Doe" };
    const result = transformKeys(obj, toSnakeCase);

    expect(result).toEqual({ first_name: "John", last_name: "Doe" });
  });

  it("should handle empty objects", () => {
    const obj = {};
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({});
  });

  it("should handle objects with null values", () => {
    const obj = { firstName: "John", middleName: null };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({ FIRSTNAME: "John", MIDDLENAME: null });
  });

  it("should handle objects with undefined values", () => {
    const obj = { firstName: "John", middleName: undefined };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({ FIRSTNAME: "John", MIDDLENAME: undefined });
  });

  it("should handle objects with number values", () => {
    const obj = { age: 25, height: 180 };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({ AGE: 25, HEIGHT: 180 });
  });

  it("should handle objects with boolean values", () => {
    const obj = { isActive: true, isVerified: false };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({ ISACTIVE: true, ISVERIFIED: false });
  });

  it("should not modify the original object", () => {
    const obj = { firstName: "John", lastName: "Doe" };
    const original = { ...obj };
    transformKeys(obj, (key) => key.toUpperCase());

    expect(obj).toEqual(original);
  });

  it("should handle mixed nested structures", () => {
    const obj = {
      userName: "John",
      profile: {
        personalInfo: {
          age: 25,
          city: "New York",
        },
        hobbies: ["reading", "coding"],
      },
      isActive: true,
    };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result).toEqual({
      USERNAME: "John",
      PROFILE: {
        PERSONALINFO: {
          AGE: 25,
          CITY: "New York",
        },
        HOBBIES: ["reading", "coding"],
      },
      ISACTIVE: true,
    });
  });

  it("should handle Date objects", () => {
    const date = new Date("2023-01-01");
    const obj = { createdAt: date };
    const result = transformKeys(obj, (key) => key.toUpperCase());

    expect(result.CREATEDAT).toEqual(date);
  });

  it("should add prefix to keys", () => {
    const obj = { name: "John", age: 25 };
    const result = transformKeys(obj, (key) => `user_${key}`);

    expect(result).toEqual({ user_name: "John", user_age: 25 });
  });

  it("should add suffix to keys", () => {
    const obj = { name: "John", age: 25 };
    const result = transformKeys(obj, (key) => `${key}_value`);

    expect(result).toEqual({ name_value: "John", age_value: 25 });
  });
});

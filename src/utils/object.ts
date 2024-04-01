export function getObjectDiff<T extends object>(obj1: T, obj2: T): Partial<T> {
  const keys1 = Object.keys(obj1) as (keyof T)[];
  const diff: Partial<T> = {};

  keys1.forEach((key) => {
    const keyStr = key as keyof T;
    if (obj1[keyStr] !== obj2[keyStr]) {
      diff[keyStr] = obj1[keyStr];
    }
  });

  return diff;
}

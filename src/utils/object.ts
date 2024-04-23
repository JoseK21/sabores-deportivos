export function getObjectDiff<T extends object>(updated: T, original: T): Partial<T> {
  const keys1 = Object.keys(updated) as (keyof T)[];
  const diff: Partial<T> = {};

  keys1.forEach((key) => {
    const keyStr = key as keyof T;

    if (keyStr === "image" && updated[keyStr] && (updated[keyStr] as any).type === "application/octet-stream") {
      return; // Omitir la propiedad 'image' si su tipo MIME es 'application/octet-stream'
    }

    if (updated[keyStr] !== original[keyStr]) {
      diff[keyStr] = updated[keyStr];
    }
  });

  return diff;
}

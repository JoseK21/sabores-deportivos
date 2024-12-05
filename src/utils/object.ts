const imagesKeys = ["coverImageUrl", "logoUrl", "image"];

export function getObjectDiff<T extends object>(updated: T, original: T, excludeKeys: string[] = []): Partial<T> {
  const keys1 = Object.keys(updated) as (keyof T)[];
  const diff: Partial<T> = {};

  keys1.forEach((key) => {
    const keyStr = key as keyof T;

    const updatedValue = updated[keyStr];
    const originalValue = original[keyStr];

    if (
      keyStr === "id" ||
      excludeKeys.includes(`${keyStr as string}`) ||
      (imagesKeys.includes(`${keyStr as string}`) &&
        updatedValue &&
        (updatedValue as any).type === "application/octet-stream")
    ) {
      return; // Omitir la propiedad 'image' si su tipo MIME es 'application/octet-stream'
    }

    const isDateComparison = updatedValue instanceof Date && originalValue instanceof Date;

    if (isDateComparison) {
      if (updatedValue.getTime() !== originalValue.getTime()) {
        diff[keyStr] = updatedValue;
      }
    } else if (updatedValue !== originalValue) {
      diff[keyStr] = updatedValue;
    }
  });

  return diff;
}

export function createResources(...enums: Record<string, string>[]): string[] {
  return enums.flatMap((enumObj) => Object.values(enumObj));
}

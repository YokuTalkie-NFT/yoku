function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function camelCaseKeys(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(camelCaseKeys);
  }

  return Object.keys(obj).reduce((acc: { [key: string]: any }, key: string) => {
    const camelKey: string = snakeToCamel(key);
    acc[camelKey] = camelCaseKeys(obj[key]);
    return acc;
  }, {});
}

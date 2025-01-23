export function toSnakeCase(str: string) {
  return str
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, '_'); // Replace spaces with underscores
}
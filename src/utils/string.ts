export function getFirstChars(texto: string) {
  return (texto || "").split(" ").reduce((acc, word) => acc + word.charAt(0).toUpperCase(), "").substring(0,2);
}

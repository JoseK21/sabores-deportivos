export function getFirstChars(texto: string) {
  return (texto || "")
    .split(" ")
    .reduce((acc, word) => acc + word.charAt(0).toUpperCase(), "")
    .substring(0, 2);
}

export function cleanText(textValue: string = ""): string {
  // Eliminar caracteres especiales y espacios en blanco
  const text = textValue.replace(/[^\w\s]/gi, "").replace(/\s+/g, "");

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

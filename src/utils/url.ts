export function generateSlug(name: string, location: string): string {
  const slug = `${(name || "").toLowerCase().trim().replace(/\s+/g, "-")}-${(location || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")}`;

  // Eliminar caracteres especiales y guiones dentro del nombre
  const cleanSlug = slug.replace(/[^\w\s\-]+/g, "").replace(/-+/g, "-");

  return cleanSlug;
}

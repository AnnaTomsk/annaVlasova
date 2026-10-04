/**
 * Helper to safely resolve image paths in Vite (both local dev and GitHub Pages production)
 * Supports:
 * - External URLs: https://...
 * - Relative public paths: "works/before-1.jpg", "/works/before-1.jpg", "./works/before-1.jpg"
 * - Short names: "before-1.jpg", "before-1", "works/before-1"
 */
export function resolveImageUrl(path: string): string {
  if (!path) return '';

  // 1. External or base64 URLs
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // 2. Clean leading dots and slashes
  let clean = path.replace(/^\.?\/+/, '').trim();

  // 3. If file extension is missing, add .jpg
  if (!clean.includes('.')) {
    clean = `${clean}.jpg`;
  }

  // 4. If it's directly referencing before-X or after-X, prepend works/
  if (!clean.startsWith('works/') && (clean.startsWith('before-') || clean.startsWith('after-'))) {
    clean = `works/${clean}`;
  }

  // 5. Build URL respecting Vite's base path
  const base = import.meta.env.BASE_URL || './';
  if (base.endsWith('/')) {
    return `${base}${clean}`;
  }
  return `${base}/${clean}`;
}

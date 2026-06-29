const DOCUMENT_EXTS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'hwp', 'csv', 'md', 'rtf', 'odt'];
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'avif'];
const ARCHIVE_EXTS = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'zst'];

export function getExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

export function getCategory(extension) {
  const ext = extension?.toLowerCase();
  if (DOCUMENT_EXTS.includes(ext)) return 'document';
  if (IMAGE_EXTS.includes(ext)) return 'image';
  if (ARCHIVE_EXTS.includes(ext)) return 'archive';
  return 'other';
}

export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function buildStoragePath(filename) {
  const timestamp = Date.now();
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `uploads/${timestamp}_${safe}`;
}

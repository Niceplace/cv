export function safeUrl(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const trimmed = url.trim();

  const dangerousProtocols = /^(javascript|data|vbscript|file|about):/i;
  if (dangerousProtocols.test(trimmed)) {
    console.warn(`[Security] Blocked dangerous URL: ${trimmed.slice(0, 50)}`);
    return null;
  }

  const safeProtocols = /^(https?|mailto|tel|sms|ftp):/i;
  if (safeProtocols.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith('/') || trimmed.startsWith('.')) {
    return trimmed;
  }

  if (/^www\./i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  if (/^[a-z0-9][a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  console.warn(`[Security] Uncertain URL safety: ${trimmed.slice(0, 50)}`);
  return trimmed;
}

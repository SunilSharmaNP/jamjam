import { EMBEDDED_REPO_ZIP_BASE64 } from './embeddedZip';

/**
 * Downloads the full repository ZIP directly in-memory from Base64.
 * This guarantees 100% reliability in every browser, inside iframes,
 * without relying on external server endpoints or CORS.
 */
export const downloadProjectZip = (filename = 'zam-zam-hotel-kaliganj.zip'): boolean => {
  try {
    const byteCharacters = atob(EMBEDDED_REPO_ZIP_BASE64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/zip' });

    // Use msSaveOrOpenBlob for legacy IE if needed
    if ((window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(blob, filename);
      return true;
    }

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(() => {
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    }, 1000);

    return true;
  } catch (error) {
    console.error('In-memory download failed, trying server URL fallback:', error);
    try {
      const fallbackAnchor = document.createElement('a');
      fallbackAnchor.href = '/zam-zam-hotel-kaliganj.zip';
      fallbackAnchor.download = filename;
      fallbackAnchor.target = '_blank';
      fallbackAnchor.rel = 'noopener noreferrer';
      document.body.appendChild(fallbackAnchor);
      fallbackAnchor.click();
      document.body.removeChild(fallbackAnchor);
      return true;
    } catch (e) {
      alert('Could not trigger auto download. Please check your browser popup/download permissions.');
      return false;
    }
  }
};

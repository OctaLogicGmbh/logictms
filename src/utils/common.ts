export const isBrowser = typeof window !== 'undefined';

export function encodeBase64(cookie: string) {
  if (isBrowser) {
    return window.btoa(encodeURIComponent(cookie));
  }

  return Buffer.from(cookie).toString('base64');
}

export function decodeBase64(cookie: string) {
  if (isBrowser) {
    return decodeURIComponent(window.atob(cookie));
  }

  return Buffer.from(cookie, 'base64').toString('utf-8');
}

import Cookies from 'universal-cookie';
import { configuration } from '../config';

export function setCookie(cookieName, cookieValue, cookieExpiry) {
  const cookies = new Cookies();
  const options = { domain: configuration.SESSION_COOKIE_DOMAIN, path: '/' };
  if (cookieExpiry) {
    options.expires = new Date(Date.now() + cookieExpiry * 864e5);
  }
  cookies.set(cookieName, cookieValue, options);
}

export function getCookie(cookieName) {
  const cookies = new Cookies();
  return cookies.get(cookieName);
}

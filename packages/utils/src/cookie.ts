import Cookies from 'js-cookie';

type CookieAttributes = Cookies.CookieAttributes;

// @link https://github.com/js-cookie/js-cookie
export interface ICookieOptions {
  expires?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: string;
}

export function set(name: string, value: string, opts?: ICookieOptions) {
  Cookies.set(name, value, opts as CookieAttributes);
}

export function get(name: string) {
  return Cookies.get(name);
}

export function remove(name: string, opts?: ICookieOptions) {
  Cookies.remove(name, opts as CookieAttributes);
}

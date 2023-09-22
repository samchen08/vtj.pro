import MD5 from 'crypto-js/md5';
import JSEncrypt from 'jsencrypt';

export function md5(content: string) {
  return String(MD5(content));
}

export function RSA(key: string, content: string) {
  const crypt = new JSEncrypt();
  crypt.setKey(key);
  return crypt.encrypt(content);
}

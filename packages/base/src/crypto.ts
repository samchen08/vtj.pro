import _MD5 from 'crypto-js/md5';
import _Base64 from 'crypto-js/enc-base64';
import enc from 'crypto-js/enc-utf8';
import ase from 'crypto-js/aes';
import JSEncrypt from 'jsencrypt';

const RSA_PUBLIC_KEY =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALdyxTCEB5WcGnbeUyN4xn1cs8z+0tC72vgbd/L99om5TZ0OfRqRb6Y7RJfdimB9LJyvmyP9T1P0jWrHkotq8iUCAwEAAQ==';

const RSA_PRIVATE_KEY =
  'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAt3LFMIQHlZwadt5T' +
  'I3jGfVyzzP7S0Lva+Bt38v32iblNnQ59GpFvpjtEl92KYH0snK+bI/1PU/SNaseS' +
  'i2ryJQIDAQABAkBGHyXG7MDlbD0lcMhAx9q/cp773fABf70sl3tbM754V+mH8dEi' +
  'Aim398NhhrADz4F4K12H74R39O/0Hjr/VAZlAiEA5+3MoAbnsDOzFP+oT4YZJBjx' +
  '8MmsukU3AaguPW4tYcMCIQDKfN+Qk/jD3vZlWsUJ23013D2NDSjgcH4gdV71oYb1' +
  '9wIgUMWYhgLhnZPjwmRnEYr6JoApglo6NYT1azZPJEXCuFECIDyQUQYbXCKpw6TZ' +
  'G2oxXigH8dkIgJtwyijHMlnhsE5NAiBxF7HA7U2rDnZ6+VRDXtIg+joD3o1h3bFy' +
  '2A+QX5yDYA==';
/**
 * MD5加密
 * @param content
 * @returns
 */
export function MD5(content: string) {
  return String(_MD5(content));
}

/**
 * Base64编码
 * @param content
 * @returns
 */
export function base64(content: string) {
  const wordArray = enc.parse(content);
  return _Base64.stringify(wordArray);
}

/**
 * Base64解码
 * @param content
 * @returns
 */
export function unBase64(content: string) {
  return enc.stringify(_Base64.parse(content));
}

/**
 * 非对称加密
 * @param content 内容
 * @param key 公钥
 * @returns
 * @description RSA密钥对生成工具
 */
export function RSA(content: string, key: string = RSA_PUBLIC_KEY) {
  const crypt = new JSEncrypt();
  crypt.setKey(key);
  return crypt.encrypt(content);
}

/**
 * 非对称解密
 * @param content 内容
 * @param key 私匙
 * @returns
 */
export function unRSA(content: string, key: string = RSA_PRIVATE_KEY) {
  const crypt = new JSEncrypt();
  crypt.setPrivateKey(key);
  return crypt.decrypt(content);
}

/**
 * 对称加密
 * @param content
 * @param key
 * @returns
 */
export function AES(content: string, key: string) {
  return ase.encrypt(content, key).toString();
}

/**
 * 对称解密
 * @param content
 * @param key
 * @returns
 */
export function unAES(content: string, key: string) {
  return ase.decrypt(content, key).toString(enc);
}

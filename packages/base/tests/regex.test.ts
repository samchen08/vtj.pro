import { describe, it, expect } from 'vitest';
import {
  isUrl,
  isEmail,
  isIdCardNo,
  isMobilePhone,
  isCarNo,
  rURL,
  rEmail,
  rID,
  rMobile,
  rCar
} from '../src';

describe('正则表达式校验工具', () => {
  describe('isUrl', () => {
    it('应校验正确URL', () => {
      expect(isUrl('http://example.com')).toBe(true);
      expect(isUrl('https://www.example.com')).toBe(true);
      expect(isUrl('https://example.com/path/to/page')).toBe(true);
    });

    it('应拒绝无效URL', () => {
      expect(isUrl('')).toBe(false);
      expect(isUrl('not-a-url')).toBe(false);
      expect(isUrl('ftp://example.com')).toBe(false);
    });
  });

  describe('isEmail', () => {
    it('应校验正确邮箱', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('应拒绝无效邮箱', () => {
      expect(isEmail('')).toBe(false);
      expect(isEmail('not-email')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
    });
  });

  describe('isIdCardNo', () => {
    it('应校验15位身份证', () => {
      expect(isIdCardNo('110101900101011')).toBe(true);
    });

    it('应校验18位身份证', () => {
      expect(isIdCardNo('11010119900101011X')).toBe(true);
      expect(isIdCardNo('11010119900101011x')).toBe(true);
    });

    it('应拒绝无效身份证', () => {
      expect(isIdCardNo('')).toBe(false);
      expect(isIdCardNo('12345')).toBe(false);
    });
  });

  describe('isMobilePhone', () => {
    it('应校验正确手机号', () => {
      expect(isMobilePhone('13800138000')).toBe(true);
      expect(isMobilePhone('15912345678')).toBe(true);
      expect(isMobilePhone('18612345678')).toBe(true);
    });

    it('应拒绝无效手机号', () => {
      expect(isMobilePhone('')).toBe(false);
      expect(isMobilePhone('00123456789')).toBe(false);
      expect(isMobilePhone('1380013800')).toBe(false);
    });
  });

  describe('isCarNo', () => {
    it('应校验新能源车牌', () => {
      expect(isCarNo('粤BD12345')).toBe(true);
      expect(isCarNo('粤BF12345')).toBe(true);
    });

    it('应校验传统车牌', () => {
      expect(isCarNo('粤B12345')).toBe(true);
      expect(isCarNo('京A88888')).toBe(true);
    });

    it('应拒绝无效车牌', () => {
      expect(isCarNo('')).toBe(false);
      expect(isCarNo('abc')).toBe(false);
    });
  });

  describe('正则表达式常量', () => {
    it('rURL 应匹配 http/https URL', () => {
      expect(rURL.test('http://example.com')).toBe(true);
      expect(rURL.test('https://example.com')).toBe(true);
      expect(rURL.test('not-a-url')).toBe(false);
    });

    it('rEmail 应匹配邮箱地址', () => {
      expect(rEmail.test('test@example.com')).toBe(true);
      expect(rEmail.test('not-email')).toBe(false);
    });

    it('rID 应匹配身份证号码', () => {
      expect(rID.test('11010119900101011X')).toBe(true);
      expect(rID.test('12345')).toBe(false);
    });

    it('rMobile 应匹配手机号码', () => {
      expect(rMobile.test('13800138000')).toBe(true);
      expect(rMobile.test('00123456789')).toBe(false);
    });

    it('rCar 应匹配车牌号码', () => {
      expect(rCar.test('粤BD12345')).toBe(true);
      expect(rCar.test('粤B12345')).toBe(true);
      expect(rCar.test('abc')).toBe(false);
    });
  });
});

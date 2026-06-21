import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Logger, getLogger, logger } from '../src';

describe('Logger 日志工具', () => {
  let consoleDebug: any;
  let consoleLog: any;
  let consoleWarn: any;
  let consoleError: any;

  beforeEach(() => {
    consoleDebug = vi.spyOn(console, 'debug').mockImplementation(() => {});
    consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('默认 Logger 应输出 warn 及以上级别', () => {
    const log = getLogger({ level: 'warn', bizName: 'Test' });
    log.debug('debug msg');
    expect(consoleDebug).not.toHaveBeenCalled();
    log.log('log msg');
    expect(consoleLog).not.toHaveBeenCalled();
    log.info('info msg');
    expect(consoleLog).not.toHaveBeenCalled();
    log.warn('warn msg');
    expect(consoleWarn).toHaveBeenCalled();
    log.error('error msg');
    expect(consoleError).toHaveBeenCalled();
  });

  it('debug 级别应输出所有日志', () => {
    const log = getLogger({ level: 'debug', bizName: 'Test' });
    log.debug('debug msg');
    expect(consoleDebug).toHaveBeenCalled();
  });

  it('log 级别应输出 debug 以上', () => {
    const log = getLogger({ level: 'log', bizName: 'Test' });
    log.debug('debug msg');
    expect(consoleDebug).not.toHaveBeenCalled();
    log.log('log msg');
    expect(consoleLog).toHaveBeenCalled();
    log.info('info msg');
    expect(consoleLog).toHaveBeenCalled();
  });

  it('bizName 应添加前缀', () => {
    const log = getLogger({ level: 'log', bizName: 'MyApp' });
    log.log('test message');
    expect(consoleLog).toHaveBeenCalledWith('[MyApp] test message');
  });

  it('bizName 前缀应处理非字符串参数', () => {
    const log = getLogger({ level: 'log', bizName: 'MyApp' });
    log.log({ key: 'value' });
    expect(consoleLog).toHaveBeenCalledWith('[MyApp]', { key: 'value' });
  });

  it('全局 logger 实例应存在', () => {
    expect(logger).toBeInstanceOf(Logger);
    expect(logger.log).toBeInstanceOf(Function);
    expect(logger.debug).toBeInstanceOf(Function);
    expect(logger.info).toBeInstanceOf(Function);
    expect(logger.warn).toBeInstanceOf(Function);
    expect(logger.error).toBeInstanceOf(Function);
  });

  it('bizName 非 * 时应添加前缀', () => {
    const log = getLogger({ level: 'log', bizName: 'CustomBiz' });
    log.warn('warning');
    expect(consoleWarn).toHaveBeenCalledWith('[CustomBiz] warning');
  });

  it('error 级别应输出', () => {
    const log = getLogger({ level: 'error', bizName: 'Test' });
    log.debug('d');
    expect(consoleDebug).not.toHaveBeenCalled();
    log.error('e');
    expect(consoleError).toHaveBeenCalled();
  });
});

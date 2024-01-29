export type LoggerLevel = 'debug' | 'log' | 'info' | 'warn' | 'error';

interface Options {
  level?: LoggerLevel;
  bizName?: string;
}

const levels = { debug: -1, log: 0, info: 0, warn: 1, error: 2 };

const record = function (
  logLevel: LoggerLevel,
  targetLevel: LoggerLevel,
  bizName: string,
  targetBizName: string
) {
  return function (...args: any[]) {
    if (targetLevel && levels[targetLevel] <= levels[logLevel]) {
      // IE9 下没有 apply 函数
      if (
        // @ts-ignore
        console[logLevel].apply &&
        (targetBizName === '*' || bizName.startsWith(targetBizName))
      ) {
        return console[logLevel].apply(console, getLogArgs(args, bizName));
      }
    }
  };
};

function getLogArgs(args: any[], bizName: string) {
  if (bizName !== '*') {
    if (typeof args[0] === 'string') {
      args[0] = `[${bizName}] ${args[0]}`;
    } else {
      args = ['[' + bizName + ']'].concat(args);
    }
  }
  return args;
}

function parseLogConf(
  logConf: any,
  options: Options
): { targetLevel: LoggerLevel; targetBizName: string } {
  if (!logConf) {
    return {
      targetLevel: options.level as LoggerLevel,
      targetBizName: options.bizName as string
    };
  }
  if (~logConf.indexOf(':')) {
    const pair = logConf.split(':');
    return {
      targetLevel: pair[0],
      targetBizName: pair[1]
    };
  }
  return {
    targetLevel: logConf,
    targetBizName: '*'
  };
}

const defaultOptions: Options = {
  level: 'warn',
  bizName: '*'
};

class Logger {
  config: { targetLevel: LoggerLevel; targetBizName: string };
  options: Options;
  constructor(options: Options) {
    this.options = { ...defaultOptions, ...options };
    const _location = typeof location !== 'undefined' ? location : ({} as any);
    // __logConf__ 格式为 logLevel[:bizName]
    //   1. log|warn|debug|error
    //   2. log|warn|debug|error:*
    //   3. log|warn|debug|error:bizName
    const logConf = (/__(?:logConf|logLevel)__=([^#/&]*)/.exec(
      _location.href
    ) || [])[1];
    this.config = parseLogConf(logConf, options);
  }
  private _log(level: LoggerLevel): any {
    const { targetLevel, targetBizName } = this.config;
    const { bizName } = this.options;
    return record(level, targetLevel, bizName as string, targetBizName);
  }
  debug(...args: any | any[]): any {
    return this._log('debug')(...args);
  }
  log(...args: any | any[]): any {
    return this._log('log')(...args);
  }
  info(...args: any | any[]): any {
    return this._log('info')(...args);
  }
  warn(...args: any | any[]): any {
    return this._log('warn')(...args);
  }
  error(...args: any | any[]): any {
    return this._log('warn')(...args);
  }
}

export function getLogger(config: {
  level: LoggerLevel;
  bizName: string;
}): Logger {
  return new Logger(config);
}
const logger = getLogger({ level: 'log', bizName: 'VTJ' });

export { Logger, logger };

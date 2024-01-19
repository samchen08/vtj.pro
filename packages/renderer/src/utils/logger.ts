import Logger, { type Level } from 'zen-logger';

export function getLogger(config: { level: Level; bizName: string }): Logger {
  return new Logger(config);
}
const logger = getLogger({ level: 'log', bizName: 'VTJ' });
export { Logger, logger };

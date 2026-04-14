import pino from "pino";

const isDevelopment = process.env.NODE_ENV === "development";

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
  ...(isDevelopment
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      }
    : {
        formatters: {
          level: (label) => ({ level: label }),
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      }),
  base: {
    env: process.env.NODE_ENV,
    app: "conference-5.0",
  },
});

export const createRequestLogger = (context: string) => {
  return logger.child({ context });
};

export const apiLogger = createRequestLogger("api");
export const authLogger = createRequestLogger("auth");
export const dbLogger = createRequestLogger("database");
export const emailLogger = createRequestLogger("email");
export const uploadLogger = createRequestLogger("upload");

export default logger;

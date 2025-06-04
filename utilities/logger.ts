import pino from "pino";
import path from "path";

// Optional: write to log file + pretty print to console
const logFilePath = path.resolve("test-logs.log");

const logger = pino({
  level: "info",
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          customColors: "error:red,info:green,warn:yellow",
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
        level: "info",
      },
      {
        target: "pino/file",
        options: { destination: logFilePath },
        level: "info",
      },
    ],
  },
});

export default logger;

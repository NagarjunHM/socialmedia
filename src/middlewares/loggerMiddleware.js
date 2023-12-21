import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "combined.log",
      level: "info",
      format: winston.format.simple(),
    }),
  ],
});

export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logData = {
    Timestamp: timestamp,
    RequestUrl: req.originalUrl,
    RequestParameters: req.params,
    RequestBody: req.body,
  };
  logger.info("Request Info: ", logData);
  next();
};

export const errorLogger = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const logData = {
    Timestamp: timestamp,
    Error: err.message,
    statusCode: err.statusCode,
    RequestUrl: req.originalUrl,
    RequestParameters: req.params,
    RequestBody: req.body,
  };
  logger.error("Error Info: ", logData);
  next(err);
};

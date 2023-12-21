export default class customError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    console.log("customError", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  } else {
    console.error(
      "Error :",
      `[${new Date().toISOString()}] Error at ${req.method} ${
        req.originalUrl
      }:`,
      err
    );
    res.status(500).json({ error: "internal server error" });
  }
};

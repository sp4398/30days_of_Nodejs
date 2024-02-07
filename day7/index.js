const express = require("express");
const app = express();
const PORT = 3000;


const requestLoggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`[${timestamp}] ${method} ${req.originalUrl}`);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

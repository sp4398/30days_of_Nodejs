const express = require("express");
const app = express();

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();

  const { method, url, headers, body } = req;

  console.log(`[${timestamp}] ${method} ${url}`);
  console.log("Headers:", headers);
  console.log("Body:", body);

  next();
}

app.use(loggingMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

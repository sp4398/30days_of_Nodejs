const express = require("express");
const app = express();

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (Number.isInteger(number) && number > 0) {
    return res
      .status(200)
      .json({ message: "Success: Number is a positive integer." });
  } else {
    return next(new Error("Error: 'number' must be a positive integer."));
  }
}

function errorHandler(err, req, res, next) {
  if (err.message.startsWith("Error: 'number' must be a positive integer.")) {
    res.status(400).send("Bad request: "+err.message);
  } else {
    next(err);
  }
}

app.use(errorHandler);

app.get("/positive", positiveIntegerHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

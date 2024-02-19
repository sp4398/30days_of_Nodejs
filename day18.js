const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting to MongoDB:",err))

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).lean();
    res.json(users);
  } catch (err) {
    console.error("MongoDB Query Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

app.get("/users", getAllUsers);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

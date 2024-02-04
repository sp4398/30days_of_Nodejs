const fs = require("fs");

async function readFileContent(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else console.log("File content:\n " + data);
  });
}

readFileContent("test-files/files.txt");
readFileContent("empty-file.txt");
readFileContent("nonexistent-file.txt");
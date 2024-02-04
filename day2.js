const fs = require("fs");

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content,"utf-8", (err,data) =>{
      if(err){
        console.error(filePath+" no such file or directory");
        return;
      }
        else{
          console.log("Data written to: "+ filePath);
        }
      })
}


writeToFile('test-files/output1.txt', 'Sample content.');

writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');

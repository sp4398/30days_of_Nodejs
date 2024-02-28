const express = require("express");

const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

//init app
const app = express();

//db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app listening at port 3000");
    });
    db = getDb();
  }
});

//routes
app.get("/books", (req, res) => {

    let books=[]
    db.collection('books')
      .find()
      .sort({author:1})
      .forEach(book=>books.push(book))
      .then(()=>{
            res.status(200).json(books)
        })
      .catch(()=>{
            res.status(500).json({error:'Could not fetch the documents'})
        })
});

app.get('/books/:id', (req, res) => {
    const bookId = new ObjectId(req.params.id);
    
    db.collection('books')
      .findOne({ _id: bookId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({ error: 'Document not found' });
        }
  
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch the document' });
      });
  });
  

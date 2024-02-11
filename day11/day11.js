const express=require('express');
const app = express();
const port=3000;

const authenticate=require('./authMiddleware');
app.get('/',(req,res) => {
    res.send('You are now authenticated');
});

app.get('/protected',authenticate,(req,res) => {
    res.send('Failed for authorized');
});

app.listen(port, ()=> {
    console.log(`listening on port:${port}`);
});
const express = require('express');
const app = express();
const cache = {};
const port = 3000;


const cachingMiddleware=(req, res, next) =>{
  const cacheKey = req.url;
  const cachedResponse=cache[cacheKey];

  if(cachedResponse){
    console.log('Cached response found for cache key: ', cacheKey);
    return res.send(cachedResponse);
  }

  const originalSend = res.send;
  res.send = (body) =>{
    cache[cacheKey] = body;
    console.log('Response cached for ', cacheKey);
    originalSend.call(res, body);
  };

  next();
}
app.use(cachingMiddleware);
app.get('/', (req, res) =>{
    res.send('Welcome to the Express application');
})
app.get('/data',(req,res) =>{
    const responseData=[message,'this is cached data'];
    res.json(responseData);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

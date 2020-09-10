const express = require('express');
const app = express();
const path = require('path');

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!');
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));

app.post('/api',(req,res,next)=>{
  console.log(req.body);
  res.send(req.body);
});

app.use((req, res)=>{
  res.sendStatus(404);
});

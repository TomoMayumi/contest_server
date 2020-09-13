const express = require('express');
const app = express();
const path = require('path');

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!');
});

app.use(express.urlencoded({extended:true}));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.post('/api',(req,res,next)=>{
  console.log(req.body);
  res.redirect('/static');
});

app.use((req, res)=>{
  res.sendStatus(404);
});

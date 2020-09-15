const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!');
});

app.use(express.urlencoded({extended:true}));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.post('/api',(req,res,next)=>{
  const code = req.body.code;
  const dir = './tmp';
  const file = path.join(dir,'tmp.rb');

  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(file,code);

  try{
    execSync(`ruby -c ${file}`);
    try{
      const result = execSync(`ruby ${file}`);
      console.log({result:result.toString()});
    }catch(err){
      console.log({stderr:err.stderr.toString(),stdout:err.stdout.toString()});
    }
  }catch(err){
    console.log({stderr:err.stderr.toString(),stdout:err.stdout.toString()});
  }
  fs.unlinkSync(file);
  res.redirect('/static');
});

app.use((req, res)=>{
  res.sendStatus(404);
});

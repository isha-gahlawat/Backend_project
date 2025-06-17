const express= require('express');
const app= express(); 
const path=require('path');
const fs=require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static (path.join(__dirname,'public')));
app.set('view engine','ejs');
 
app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
    res.render('index',{files:files});
    })
}) 

app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show',{filename:req.params.filename,filedata:filedata});
    })
}) 

app.get('/file/edit/:filename', function (req, res) {
    const filename = req.params.filename;

    fs.readFile(`./files/${filename}`, "utf-8", function (err, filedata) {
        res.render('edit', { filename: filename, filedata: filedata });
    });
});
app.post('/file/edit/:filename', function (req, res) {
  const filename = req.params.filename;
  const newContent = req.body.notenew;

  fs.writeFile(`./files/${filename}`, newContent, 'utf-8', function (err) {
    res.redirect('/');
  });
});


app.post('/create',function(req,res){  
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.note,function(err){
    res.redirect("/")
    })
}) 

app.listen(3000);
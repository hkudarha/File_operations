const express= require('express');
const app = express();
const path = require('path'); // Import path module
const fs = require('fs');

// use for handle Form data, wich we get from backend
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// to get path of public folder
app.use(express.static(path.join(__dirname, 'public')));


//  setup ejs as a middleware for view engine(rander ejs pages )
app.set('view engine', 'ejs');

// router
app.get('/', function (req, res){
  // read files
    fs.readdir(`./files`,function(err,files){  
      res.render("index",{files: files});
    })
  })
  
app.get('/files/:filename', function (req, res){
  fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
    res.render('show',{filename: req.params.filename, filedata:filedata});
  })
  })

app.get('/edit/:filename', function (req, res){
  res.render('edit',{filename: req.params.filename});
  })

app.post('/edit', function (req, res){
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){
    res.redirect("/");
  })
  })

app.post('/create', function (req, res){
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
    res.redirect("/")
  })
})
  
  app.listen(3000)
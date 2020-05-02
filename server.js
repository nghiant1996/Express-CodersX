// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');



app.set('views','./views');
app.set('view engine', 'pug');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('My name is Nghia');
});

app.get('/books', (req, res) => {
  res.render('books',{
    books: db.get('books').value()
  })
});

app.get('/books/add', (req,res) => {
  res.render('add');
});

app.post('/books/add', (req,res) => {
  req.body.id = shortid.generate();
  db.get('books')
    .push(req.body)
    .write();
  res.redirect('/books');
  
});

app.get('/books/delete/:id', (req, res) => {
  var id = req.params.id;
  db.get('books')
    .remove({id: id})
    .write()
  res.redirect('/books')
})

app.get('/books/update', (req,res) => {
  res.render('update');
})

app.post('/books/update', (req,res) => {
  // console.log(req.body)
  var title = req.body.title;
  var newTitle = req.body.newTitle;
  db.get('books')
    .find({title: title})
    .assign({title: newTitle})
    .write()
  res.redirect('/books');
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

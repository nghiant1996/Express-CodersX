// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)


var todoList = db.get('todos').value();
// var todos = [
//   {id: 1, name: 'Đi chợ'},
//   {id: 2, name: 'Rửa bát'},
//   {id: 3, name: 'Nấu cơm'}
// ];

app.set('views','./views');
app.set('view engine', 'pug');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos',(req,res)=>{
  res.render('todos', {
    todos: todoList
  });
});

app.get('/todos/search', (req,res) => {
  var q = req.query.q;
  var matchedItems = todoList.filter(function(todo){
    return todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render('todos', {
    todos: matchedItems
  })
});

app.get('/todos/create', (req,res) => {
  res.render('create');
});

app.post('/todos/create', (req,res) => {
  db.get('todos')
    .push({id: todoList.length,
                 text: req.body.name})
    .write();
  res.redirect('/todos');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

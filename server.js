// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
var todos = [
  {id: 1, name: 'Đi chợ'},
  {id: 2, name: 'Rửa bát'},
  {id: 3, name: 'Nấu cơm'}
];

app.set('views','./views');
app.set('view engine', 'pug');

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos',(req,res)=>{
  res.render('todos', {
    todos: todos
  });
});

app.get('/todos/search', (req,res) => {
  var q = req.query.q;
  var matchedItems = todos.filter(function(todo){
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render('todos', {
    todos: matchedItems
  })
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

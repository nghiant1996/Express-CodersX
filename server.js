// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var shortid = require('shortid');
var db = require('./db.js');

var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');
var transactionRoute = require('./routes/transaction.route')



app.set('views','./views');
app.set('view engine', 'pug');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('My name is Nghia');
});


app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', transactionRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

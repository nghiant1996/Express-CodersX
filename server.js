// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config();

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');



var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');
var transactionRoute = require('./routes/transaction.route');
var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');


app.set('views','./views');
app.set('view engine', 'pug');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('da8oqh12JA')); //'da8oqh12JA': secret, phuc vu cho signed Cookie, doc trong tai lieu


// app.use(function(req, res, next) {
//  res.clearCookie('userId'); 
//  console.log(req.cookies);
// 	next();
// })

app.get('/', (req, res) => {
  res.send('My name is Nghia');
});


app.use('/books', authMiddleware.requireAuth, bookRoute);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionRoute);

app.use('/auth', authRoute);

// app.use(function(req,res,next){
//   if(req.cookies.count === undefined){
//     res.cookie('count', 0);
//   }else {
//     var count = parseInt(req.cookies.count) + 1;
//     res.cookie('count', count);
//   }
//   console.log(count);
//   next();
  
// })





// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

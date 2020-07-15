const express = require('express');
const createError = require('http-errors');
const app = express();
const path = require('path');
const books = require('./routes/books.js');
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use('/static', express.static( path.join( __dirname, 'public' ) ) );
app.use(bodyParser.urlencoded({extended: false}));

require('./routes/index')(app);
app.use('/books', books)

// 404 ERROR HANDLER
app.use( (req, res, next) => {
    next(createError(404));
});

// GLOBAL ERROR HANDLER
app.use( (err, req, res, next) => {  
    // render the error page
    res.status(err.status || 500);
    res.render('page_not_found');
  });

let port = (process.env.PORT) ? process.env.PORT : 3000;
app.listen(port, ()=> console.log(`listening on port ${port}.`))
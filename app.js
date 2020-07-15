const express = require('express');
const app = express();
const path = require('path');

require('./routes')(app);

app.set('view engine', 'pug');

app.use('/static', express.static( path.join( __dirname, 'public' ) ) );asdfas
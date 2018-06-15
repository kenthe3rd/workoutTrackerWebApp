var express = require('express');
var mysql = require('./dbcon.js');
var handlebars = require('express-handlebars').create({defaultLayout: 'default'});
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 30055);
app.set('mysql', mysql);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('node_modules'));

app.use('/', require('./index.js'));

app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port') + ' . Ctrl-c to terminate.\n');
});
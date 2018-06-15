var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: '****',
    password: '****',
    database: 'cs290_hallkenn'
});
module.exports.pool = pool;
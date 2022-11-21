const MySQL = require('mysql');
const connect = MySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // database: "test"
});

// for checking connection in eastablish or not
connect.connect((err) => {
    if (err) {
        console.warn('error')
    } else {
        console.warn('connected')
    }
});

// connect.query("select * from cab",(err,result)=>{
//     console.warn(result);
// });
module.exports = connect;
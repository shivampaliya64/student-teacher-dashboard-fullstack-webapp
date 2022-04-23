const { application } = require('express');
const express=require('express');
var router=express.Router();

const sql=require('./node_modules/mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'timeline',
    password : 'password',
    database : 'timeline'
});

app.get('/sign-up',(req,res)=>{
    console.log("get usexs");
});

//sql logic, get or put or post or update or delete


module.exports = router;
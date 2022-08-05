const express = require('express');
const csv = require('fast-csv');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');
const mime = require('mime');
const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const DatauriParser = require("datauri/parser");
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const { send } = require('process');
const { defaultMaxListeners } = require('events');
const { response } = require('express');




app.use(cors());
app.use(function (request, response, next) {
  // console.log("REQUEST:" + request.method + " " + request.url);
  // console.log("BODY:" + JSON.stringify(request.body));
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
// app.use(bodyParser.json({type:'*/*'}));


app.use("/files", express.static(__dirname + '/upload/'));


const db=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'timeline',
  port:'3306',
})




// const options ={
//   connectionLimit: 10,
//   password: 'root',
//   user: 'root',
//   database: 'timeline',
//   host: 'localhost',
//   port: '3306',
//   createDatabaseTable: true
// }
// const  sessionStore = new mysqlStore(options);
// app.use(session({
//   name: 'name1',
//   resave: false,
//   saveUninitialized: false,
//   store: sessionStore,
//   secret: 'secretkey',
//   cookie: {
//       maxAge: 1000*60*60*24,
//       sameSite: true,
//       secure: false
//   }
// }))
// // app.use((req,res)=>{
// //   // console.log(req.session.id);
// // })
db.connect(err=>{
  if(err)console.log(err,' Error');
  console.log("DB connected");
});





// multer and cloudinary config....

dotenv.config();


//                          for cloudinary part::
// cloudinary.config({
//     cloud_name : process.env.CLOUD_NAME,
//     api_key : process.env.API_KEY,
//     api_secret : process.env.API_SECRET
// })
// const upload = multer({
//     storage: multer.diskStorage({ 'destination':'uploads'}),
//     fileFilter:(req,file,cb)=>{
//       let ext=path.extname(file.originalname);
//       console.log("extension is :"+ext);
//       if(ext!==".jpg" && ext!==".jpeg" && ext!==".png"){
//         cb(new Error("File type not supported"),false);
//         return;
//       }
//       cb(null,true);
//     },    
// });
// const parser = new DatauriParser();


// function decodeBase64Image(dataString) {
//   var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
//     response = {};
//   if (matches.length !== 3) {
//     return new Error('Invalid input string');
//   }
//   response.type = matches[1];
//   response.data = new Buffer(matches[2], 'base64');
//   return response;
// }
// const path = './uploads';



var fileStore=__dirname+'\\uploads\\'
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    //cb(null, 'uploads');
    cb(null, fileStore);
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+'-'+file.originalname);
  }
})
const upload = multer({storage});




app.put("/file1/test",upload.single("uploadfile"),(req,res)=>{
  console.log(req.file);
  UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
  console.log('CSV file data has been uploaded in mysql database ');
  res.status(200).send({msg: "yaay"});
})
function UploadCsvDataToMySQL(filePath){
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          csvData.push(data);
      })
      .on("end", function () {
          // Remove Header ROW
          csvData.shift();
          // Open the MySQL connection
          db.connect((error) => {
              if (error) {
                  console.error(error);
              } else {
                  let query = 'INSERT IGNORE INTO teachers (fname,lname,email, t_id, gender,pass, phno, class) VALUES ?';
                  db.query(query, [csvData], (error, response) => {
                      console.log(error || response);
                  });
              }
          });  
          // delete file after saving to MySQL database
          // -> you can comment the statement to see the uploaded CSV file.
          fs.unlinkSync(filePath)
      });
  stream.pipe(csvStream);
}

app.post("/file/test", upload.single("marksheet"), (req, res) => {

  // console.log(req)
  //console.log(req.body)
  var ip_string = req.body.student;
  var st = JSON.parse(ip_string);

  console.log(st);
  //console.log(st.fname);
  console.log(req.file)
  console.log(req.file.path);
  console.log(req.file.filename);
  db.query('insert into temp_student(fname,lname,email,st_id,gender,password,phno,class,marksheet) values (?,?,?,?,?,?,?,?,?)', 
  [st.fname,st.lname,st.email,st.st_id,st.gender,st.password,st.phno, st.class,req.file.filename],
  (error)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log('query inserted!');
    }
  });

  res.send({msg: "check"})
})
app.post('/sendInfo',upload.single("marksheet"), async(req,res)=>{ 
  //console.log(req.files,' is the file..');
  console.log(req.file,' is the file..');
  const body = req.body;  

  res.send({msg: "uploaded"})
  // const decodedImg = decodeBase64Image(req.body.marksheet);
  // const imageBuffer = decodedImg.data;
  // const type = decodedImg.type;
  // var extension = mime.extension(type);
  // var fileName =  "image." + extension;
  // console.log(decodedImg,imageBuffer,type);
  // try {
  //   fs.writeFileSync(path + '/' + fileName, imageBuffer, 'utf8');
  //   return res.send({ status: 'success' });
  // } catch (e) {
  //   next(e);
  // }
  //console.log(req.body);
  //console.log(typeof(body.marksheet));
  try{
    //const file=parser.format(path.extname(req.file.originalname).toString(),req.file.buffer).content;
    //const img = await cloudinary.uploader.upload(body.marksheet);
    //console.log(img.secure_url);
    db.query('insert into temp_student(fname,lname,email,st_id,gender,password,phno,class,marksheet) values (?,?,?,?,?,?,?,?,?)',
    [body.fname, body.lname, body.email, body.st_id, body.gender, body.password, body.phno,body.class, body.marksheet],
    (error)=>{
      if(error){
          console.error(error);
          res.status(500).json({status: 'error check1'});
      }
      else{
          console.log()
          res.status(200).json({status:'working'});
      }
    });
  }
  catch(err){
    console.log(err);
  }
});
app.get('/getInfo',(req,res)=>{
  db.query("select * from temp_student", function(err, result){
    if(err){
      console.error(err);
      res.status(500).json({status: 'error check2', errStack : err.stack});
    }else{    
      res.status(200).send(result);
    }
  });
})


app.post('/insertData',(req,res)=>{
  console.log(req.body);
  var body=req.body;
  
  //console.log(body[i]);
  //console.log(body[i].marksheet);
  db.query('insert into students(fname,lname,email,st_id,gender,password,phno,class,marksheet) values (?,?,?,?,?,?,?,?,?)',
  [body.fname,body.lname,body.email,body.st_id,body.gender,body.password,body.phno,body.class,body.marksheet],
  (error)=>{
      if(error){
      console.error(error);
      res.status(500).json({status: 'error checkx'});
  }
  else{
      res.status(200).json({status:'working'});
  }
  });
});

app.post('/updateData',(req,res)=>{
  var body=req.body;
  //console.log(body.st_id+" idsaadf");
  db.query(`update temp_student set checked=? where st_id=?`,[1,body.st_id],
  (error)=>{
    if(error){
      console.log(error);
      res.status(500).json({status: 'error checkx'});
    }
    else{
      res.status(200).json({status: 'updated!'});
    }
  })
})
app.get('/getByClass/',(req,res)=>{
  console.log(req.query.cl, " is the body");
  db.query('select * from students where class=?',[req.query.cl],
  function(err,result){
    if(err){
      console.log(err);
      res.status(500).json({status: 'error check2', errStack : err.stack});
    }
    else{
      console.log(result," value");
      res.status(200).send(result);
    }
  });
});
app.get('/getsubject', (req,res)=>{
  console.log(req, 'inside subjects fetcher');
  db.query('select * from courses where class=?',[req.query.inp1],
  function(err,result){
    if(err){
      console.log(err);
      res.status(500).json({status: 'error check2', errStack : err.stack});
    }
    else{
      console.log(result," value");
      res.status(200).send(result);
    }
  });
})
app.get('/getByName/',(req,res)=>{
  console.log(req.query.nm, " is the body");
  db.query(`select * from students where fname=?`,[req.query.nm],
  function(err,result){
    if(err){
      console.log(err);
      res.status(500).json({status: 'error check2', errStack : err.stack});
    }
    else{
      console.log(result," value");
      res.status(200).send(result);
    }
  });
})

app.get('/matchData/',(req,res)=>{  
  var ID=req.query.id;  
    db.query(`select * from teachers where t_id=?`,[req.query.id],
    function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log(result);
        res.status(200).send(result);
      }
    });  
})
app.get('/matchData1/',(req,res)=>{  
  var ID=req.query.id; 
  console.log(ID) ;

    db.query(`select * from students where st_id=?`,[req.query.id],
    function(err,result){
      if(err){
        console.log(err,' err');
      }
      else{
        console.log(result,' res');
        res.status(200).send(result);
      }
    });  
})

app.post('/sendMail',(req,res)=>{
  const transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: process.env.user,
    pass: process.env.pass //pass
  }
});

var rec='';
rec+=req.body.email;
console.log(rec);
const mailOptions={
  from:'shivapaliya21@gmail.com',
  to: rec,
  subject:'Check Mail!',
  text:'Rejected, please come in for manual verification !!!'
}
transporter.sendMail(mailOptions,function(error,info){
  if(error){
    console.log(error)
  }
  else{
    console.log('Email sent ',info.response);
    }
  });
})
app.post('/sendMail1',(req,res)=>{
  const transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: process.env.user,
    pass: process.env.pass //pass
  }
});

var rec='';
rec+=req.body.email;
console.log(rec);
const mailOptions={
  from:'shivapaliya21@gmail.com',
  to: rec,
  subject:'Check Mail!',
  text:'Approved !!!, Now you can login to see your information'
}
transporter.sendMail(mailOptions,function(error,info){
  if(error){
    console.log(error)
  }
  else{
    console.log('Email sent ',info.response);
    }
  });
})

app.listen(3000,()=>{
  console.log('server running');
})
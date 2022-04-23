const express = require('express');
const multer = require('multer');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.urlencoded())
app.use(express.static('uploads'));
const upload = multer({ dest: 'uploads/' })
app.post('/sendInfo', upload.single('marksheet'), function (req, res, next) {
    // req.file is the `avatar` file
    console.log(req.file);
    // req.body will hold the text fields, if there were any
    console.log("body", req.body);
    return res.status(200).json({msg: "mazeee"});
  })

  app.listen(3000,()=>{
    console.log('server is running on port 3000');
  })
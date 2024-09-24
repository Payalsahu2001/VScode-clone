var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')

const uploadPath = path.join(__dirname,'../','public','uploads')

function uploadsData(){
  return fs.readdirSync(uploadPath)
}

router.get('/', function(req, res, next) {
  res.render('index',{uploadsData:uploadsData(),fileData:"",filename:""});
});

router.get('/:filename',(req,res)=>{
  const{filename} = req.params
  const fileData = fs.readFileSync(path.join(uploadPath,filename),'utf-8')
  res.render('index',{uploadsData:uploadsData(),fileData,filename})
})

router.get('/delete/:filename',(req,res)=>{
  fs.unlinkSync(path.join(uploadPath,req.params.filename))
  res.redirect('/')
})

router.post('/createfile',(req,res)=>{
  const {filename} = req.body
  fs.writeFileSync(path.join(uploadPath,filename),"")
  res.redirect(`/${filename}`)
})

router.post('/updated/:filename',(req,res)=>{
  const {updatedText} = req.body
  const {filename} = req.params
  fs.writeFileSync(path.join(uploadPath,filename),updatedText)
  res.redirect(`/${filename}`)
})

module.exports = router;

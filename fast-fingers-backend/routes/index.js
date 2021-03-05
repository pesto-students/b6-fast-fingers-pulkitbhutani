var express = require('express');
const { UnsupportedMediaType } = require('http-errors');
var router = express.Router();
var mysql = require("mysql");
const cors = require('cors');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sys"
});

con.connect(function(err) {
	if (err) throw err
});

/* GET home page. */
router.get('/', function(req, res, next) {  
res.render('index', { title: 'Express' });
});

router.get('/words/:difficulty', function(req,res,next){

  let lowerLimit = 0;
  let upperLimit = 0;

  switch(req.params.difficulty){
    case 'easy':
      lowerLimit = 0;
      upperLimit = 4;
      break;
    case 'medium':
      lowerLimit = 5;
      upperLimit = 8;
      break;
    case 'hard':
      lowerLimit = 9;
      upperLimit = 100;
  }

    con.query("SELECT words FROM words_table where length(words) between " + lowerLimit + " and "+ upperLimit + " order by RAND() limit 1" , function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});

router.get('/userId/:username', function(req,res,next){
    con.query("SELECT userId FROM user where username ='"+ req.params.username+"' LIMIT 1" , function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});



router.post('/register', function(req, res, next) {  

  var users={
     "username":req.body.username,
     "password":req.body.password
   }
   
  var sql =  "INSERT INTO user Values(default,'"+users.username+"',"+"'"+users.password+"',now(),now())";
  
   con.query(sql, function (error, results) {
    if (error) {
      console.log(error);
      res.status(400).send({message: "User Name already exists."});
    } else {
      console.log('no errr 22000')
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
      }
  });
  });

  router.post('/login', function(req, res, next) {  

    var users={
       "username":req.body.username,
       "password":req.body.password
     }
     
    var sql =  "SELECT username FROM user where username='"+users.username+"' and password ='"+users.password+"'";
    
     con.query(sql, function (error, results) {
      if (error) {
        console.log(error);
        res.status(400).send({message: "SQL Error."});
      }
      if(results[0]){
        res.status(200).send({message: "OK."});
      }
      else {
        res.status(400).send({message: "Login Details Incorrect."});
      }
    });
    });

    router.post('/saveScore', function(req, res, next) {  

      var scoreDetail={
        "userId" : req.body.userId,
         "username":req.body.username,
         "score":req.body.score
       }
       
      var sql =  "INSERT INTO score_board Values(default,"+scoreDetail.score+","+scoreDetail.userId+", now(), now())";
      
       con.query(sql, function (error, results) {
        if (error) {
          console.log(error);
          res.status(400).send({message: "EError"});
        } else {
          console.log('no errr 22000')
          res.send({
            "code":200,
            "success":"user registered sucessfully"
              });
          }
      });
      });

      router.get('/scoreList/:id', function(req,res,next){
        con.query("SELECT scoreId, score FROM score_board where userId ="+ req.params.id+ " order by scoreId desc limit 10", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result);
        });
    });
    



module.exports = router;

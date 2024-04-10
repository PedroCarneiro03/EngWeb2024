var express = require('express');
var router = express.Router();
var Pessoa=require("../controllers/pessoa")
var Modalidade=require("../controllers/modalidade")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/pessoas", function(req, res, next){
    
    Pessoa.list()
    .then(data=>res.jsonp(data))
    .catch(erro => res.status(521).jsonp(erro))
})

router.get("/modalidades", function(req, res, next){
    
  Modalidade.list()
  .then(data=>res.jsonp(data))
  .catch(erro => res.status(521).jsonp(erro))
})

router.get("/pessoas/:id", function(req, res, next){
  Pessoa.findById(req.params.id)
  .then(data=>res.jsonp(data))
  .catch(erro => res.status(522).jsonp(erro))
})

router.get("/modalidades/:id", function(req, res, next){
  Modalidade.findById(req.params.id)
  .then(data=>res.jsonp(data))
  .catch(erro => res.status(522).jsonp(erro))
})

router.post('/pessoas', function(req, res) {
  Pessoa.insert(req.body)
  .then(data=>res.status(201).jsonp(data))
  .catch(erro => res.status(523).jsonp(erro))
});

router.put("/pessoas/:id",function(req,res){
  Pessoa.update(req.params.id,req.body)
  .then(data=>res.status(201).jsonp(data))
  .catch(erro => res.status(524).jsonp(erro))
})

router.delete("/pessoas/:id",function(req,res){
  Pessoa.delete(req.params.id)
  .then(data=>res.status(201).jsonp(data))
  .catch(erro => res.status(525).jsonp(erro))
})







module.exports = router;

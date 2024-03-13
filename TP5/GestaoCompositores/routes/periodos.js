var express = require('express');
var router = express.Router();
var axios= require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/periodos")
    .then(resposta=>{
      res.render('listaPeriodos', {lista: resposta.data,data:d, titulo:"Lista de Periodos"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os periodos"})
    })
});

router.get('/edit/:id', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/periodos/"+ req.params.id)
    .then(resposta=>{
      res.render('editPeriodo', {periodo: resposta.data,data:d, titulo:"Editar Periodo"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});

router.get('/delete/:id', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.delete("http://localhost:3000/periodos/"+ req.params.id)
    .then(resposta=>{
      res.render('periodo', {periodo: resposta.data,data:d, titulo:"Periodo Eliminado"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});


router.get('/add', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  res.render('addPeriodo', {data:d, titulo:"Adicionar Periodo"});

});


router.get('/:id', function(req, res) {
  var d= new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/periodos/"+ req.params.id)
    .then(resposta=>{
      res.render('periodo', {periodo: resposta.data,data:d, titulo:"Consulta de periodo"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar o aluno"})
    })
});



//POST

router.post('/edit/:id', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.put("http://localhost:3000/periodos/"+ req.params.id,req.body)
    .then(resposta=>{
      res.render('periodo', {periodo: resposta.data,data:d, titulo:"Periodo Editado"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});

router.post('/add', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.post("http://localhost:3000/periodos",req.body)
    .then(resposta=>{
      res.render('periodo', {periodo: resposta.data,data:d, titulo:"Periodo Criado"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});

module.exports = router;
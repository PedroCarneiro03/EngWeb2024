var express = require('express');
var router = express.Router();
var axios= require("axios");

/* GET /Compositores. */
router.get('/', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/compositores")
    .then(resposta=>{
      res.render('listaCompositores', {lista: resposta.data,data:d, titulo:"Lista de Compositores"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});

router.get('/edit/:id', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/compositores/"+ req.params.id)
    .then(resposta=>{
      res.render('editCompositor', {compositor: resposta.data,data:d, titulo:"Editar Compositor"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});

router.get('/delete/:id', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.delete("http://localhost:3000/compositores/"+ req.params.id)
    .then(resposta=>{
      res.render('compositor', {compositor: resposta.data,data:d, titulo:"Compositor Eliminado"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});


router.get('/add', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  res.render('addCompositor', {data:d, titulo:"Adicionar Compositor"});

});


router.get('/:id', function(req, res) {
  var d= new Date().toISOString().substring(0,16)
  axios.get("http://localhost:3000/compositores/"+ req.params.id)
    .then(resposta=>{
      res.render('compositor', {compositor: resposta.data,data:d, titulo:"Consulta de compositor"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar o aluno"})
    })
});



//POST

router.post('/edit/:id', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.put("http://localhost:3000/compositores/"+ req.params.id,req.body)
    .then(resposta=>{
      res.render('compositor', {compositor: resposta.data,data:d, titulo:"Compositor Editado"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});

router.post('/add', function(req, res, next) {
  var d= new Date().toISOString().substring(0,16)
  axios.post("http://localhost:3000/compositores",req.body)
    .then(resposta=>{
      res.render('compositor', {compositor: resposta.data,data:d, titulo:"Compositor Criado"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
    })
});

module.exports = router;

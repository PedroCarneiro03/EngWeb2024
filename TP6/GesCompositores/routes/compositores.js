var express = require('express');
var router = express.Router();
var Compositor=require("../controllers/compositor")

/* GET /Compositores. */
router.get('/', function(req, res, next) {
    var d= new Date().toISOString().substring(0,16)
    Compositor.list()
    .then(data=>res.render("listaCompositores",{lista:data,data:d,titulo:"Lista de Compositores"}))
    .catch(erro => res.jsonp(erro))
});


router.get('/edit/:id', function(req, res, next) {
    var d= new Date().toISOString().substring(0,16)
    Compositor.findById(req.params.id)
        .then(data=>{
        res.render('editCompositor', {compositor:data,data:d, titulo:"Editar Compositor"});
        })
        .catch(erro=>{
        res.render("error",{error: erro, message:"Erro ao recuperar os compositores"})
        })
});

router.get('/add', function(req, res, next) {
    var d= new Date().toISOString().substring(0,16)
    res.render('addCompositor', {data:d, titulo:"Adicionar Compositor"});
});

router.get('/delete/:id', function(req, res) {
    var d= new Date().toISOString().substring(0,16)
    Compositor.deleteCompositor(req.params.id)
    .then(data=>res.render('compositor', {compositor: data,data:d, titulo:"Compositor Eliminado"}))
    .catch(erro => res.status(523).jsonp(erro))
});

router.get('/:id', function(req, res) {
    var d= new Date().toISOString().substring(0,16)
    Compositor.findById(req.params.id)
    .then(data=>res.render('compositor', {compositor: data,data:d, titulo:"Consulta de compositor"}))
    .catch(erro => res.jsonp(erro))
});


router.post('/', function(req, res) {
    var d= new Date().toISOString().substring(0,16)
    Compositor.insert(req.body)
    .then(data=>res.render('compositor', {compositor: data,data:d, titulo:"Compositor Adicionado"}))
    .catch(erro => res.status(523).jsonp(erro))
});

router.post('/edit/:id', function(req, res) {
    var d= new Date().toISOString().substring(0,16)
    Compositor.updateCompositor(req.params.id,req.body)
    .then(data=>res.render('compositor', {compositor: data,data:d, titulo:"Compositor Editado"}))
    .catch(erro => res.status(523).jsonp(erro))
});



module.exports = router;
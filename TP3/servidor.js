var http= require("http")
var fs = require("fs")
var url = require("url")
var axios=require("axios")


function listaElementosHTML(dados,campo){
    res=""
    arr= dados[campo]
    for (var i = 0; i < arr.length; i++) {
        res+="<li>" + arr[i] + "</li>\n"
    }
    return res


}




function geraFilme(dados){


    pagHTML=`
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Filmes</title>
        <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
                <h1>Filme ${dados["id"]}</h1>
            </header>
            
            <p><b>Identificador:</b>${dados["id"]}</p>
            <p><b>Titulo:</b>${dados["titulo"]}</p>
            <p><b>Year:</b>${dados["ano"]}</p>
            <b>Atores:</b>
            <ul class="w3-ul">
                ${listaElementosHTML(dados,"atores")}
            </ul>
            <b>Generos:</b>
            <ul class="w3-ul">
                ${listaElementosHTML(dados,"generos")}
            </ul>
            <footer class="w3-container w3-blue">
                <h5>Criado por Pedro Carneiro EngWeb24</h5>
            </footer>

        </div>
    </body>
</html>
    `

    return pagHTML



}




function geraFilmes(dados){


    pagHTML=`
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Filmes</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
                <h1>Lista de Filmes</h1>
            </header>
            
            <div class="w3-container">
                <table class="w3-table w3-striped">
                    <tr>
                        <th>Identificador</th>
                        <th>Titutlo</th>
                        <th>Ano</th>
                    </tr>
                    
`
dados.forEach(filme => {
    pagHTML+=`
    <tr>
        <td><a href="/filmes/${filme["id"]}">${filme["id"]}</a></td>
        <td>${filme["titulo"]}</td>
        <td>${filme["ano"]}</td>
    </tr>
    
    `


})




pagHTML+=`
                      <!-- Linhas da tabela com dados-->
                </table>
            </div>
            
            <footer class="w3-container w3-blue">
                <h5>Criado por Pedro Carneiro EngWeb24</h5>
            </footer>

        </div>
    </body>
</html>
    `

    return pagHTML



}

function geraAtores(dados){


    pagHTML=`
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Atores</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
                <h1>Lista de Atores</h1>
            </header>
            
            <div class="w3-container">
                <table class="w3-table w3-striped">
                    <tr>
                        <th>Identificador</th>
                        <th>Nome</th>
                    </tr>
                    
`
dados.forEach(ator => {
    pagHTML+=`
    <tr>
        <td><a href="/atores/${ator["id"]}">${ator["id"]}</a></td>
        <td>${ator["nome"]}</td>
    </tr>
    
    `


})






pagHTML+=`
                      <!-- Linhas da tabela com dados-->
                </table>
            </div>
            
            <footer class="w3-container w3-blue">
                <h5>Criado por Pedro Carneiro EngWeb24</h5>
            </footer>

        </div>
    </body>
</html>
    `

    return pagHTML



}

function geraAtor(dados){


    pagHTML=`
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Atores</title>
        <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
                <h1>Ator ${dados["id"]}</h1>
            </header>
            
            <p><b>Identificador:</b>${dados["id"]}</p>
            <p><b>Nome:</b>${dados["nome"]}</p>
            <b>Filmes:</b>
            <ul class="w3-ul">
                ${listaElementosHTML(dados,"filmes")}
            </ul>
            <footer class="w3-container w3-blue">
                <h5>Criado por Pedro Carneiro EngWeb24</h5>
            </footer>

        </div>
    </body>
</html>
    `

    return pagHTML



}

function geraGeneros(dados){


    pagHTML=`
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Generos</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
                <h1>Lista de Generos</h1>
            </header>
            
            <div class="w3-container">
                <table class="w3-table w3-striped">
                    <tr>
                        <th>Identificador</th>
                        <th>Designacao</th>
                    </tr>
                    
`
dados.forEach(genero => {
    pagHTML+=`
    <tr>
        <td><a href="/generos/${genero["id"]}">${genero["id"]}</a></td>
        <td>${genero["designacao"]}</td>
    </tr>
    
    `


})






pagHTML+=`
                      <!-- Linhas da tabela com dados-->
                </table>
            </div>
            
            <footer class="w3-container w3-blue">
                <h5>Criado por Pedro Carneiro EngWeb24</h5>
            </footer>

        </div>
    </body>
</html>
    `

    return pagHTML



}


function geraGenero(dados){


    pagHTML=`
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Genero</title>
        <link rel="stylesheet" href="/w3.css">
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-blue">
                <h1>Genero ${dados["id"]}</h1>
            </header>
            
            <p><b>Identificador:</b>${dados["id"]}</p>
            <p><b>Designacao:</b>${dados["designacao"]}</p>
            <footer class="w3-container w3-blue">
                <h5>Criado por Pedro Carneiro EngWeb24</h5>
            </footer>

        </div>
    </body>
</html>
    `

    return pagHTML



}

http.createServer(function(req,res){

    //Construtor de regex em js //
    var q=url.parse(req.url, true)
    var regexFilme=/^\/filmes\/5db6af40083ebab38e0[a-z|\d]{4}/
    var regexAtor=/^\/atores\/a\d+/
    var regexGenero=/^\/generos\/g\d+/
    if (q.pathname == "/"){

        fs.readFile("index.html",function(erro,dados){
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(dados)
            res.end()
        })
    }
    
    else if (q.pathname== "/filmes"){
        const axios = require("axios")
        axios.get("http://localhost:3000/filmes")
        .then(resp=> {
            dados = resp.data;
            pagHTML= geraFilmes(dados)
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(pagHTML)
            res.end()
        })
        .catch(error=>{
            res.writeHead(500,{"Content-Type": "text/html"})
            res.write("<pre>" + error + "<pre>")
            res.end()
        })

    }

    else if(regexFilme.test(q.pathname)){
        const axios = require("axios")
        axios.get("http://localhost:3000" + q.pathname)
        .then(resp=> {
            dados = resp.data;
            pagHTML= geraFilme(dados)
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(pagHTML)
            res.end()
        })
        .catch(error=>{
            res.writeHead(500,{"Content-Type": "text/html"})
            res.write("<pre>" + error + "<pre>")
            res.end()
        })


    }

    else if (q.pathname== "/atores"){
        const axios = require("axios")
        axios.get("http://localhost:3000/atores")
        .then(resp=> {
            dados = resp.data;
            pagHTML= geraAtores(dados)
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(pagHTML)
            res.end()
        })
        .catch(error=>{
            res.writeHead(500,{"Content-Type": "text/html"})
            res.write("<pre>" + error + "<pre>")
            res.end()
        })

    }
    else if(regexAtor.test(q.pathname)){
        const axios = require("axios")
        axios.get("http://localhost:3000" + q.pathname)
        .then(resp=> {
            dados = resp.data;
            pagHTML= geraAtor(dados)
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(pagHTML)
            res.end()
        })
        .catch(error=>{
            res.writeHead(500,{"Content-Type": "text/html"})
            res.write("<pre>" + error + "<pre>")
            res.end()
        })


    }

    else if (q.pathname== "/generos"){
        const axios = require("axios")
        axios.get("http://localhost:3000/generos")
        .then(resp=> {
            dados = resp.data;
            pagHTML= geraGeneros(dados)
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(pagHTML)
            res.end()
        })
        .catch(error=>{
            res.writeHead(500,{"Content-Type": "text/html"})
            res.write("<pre>" + error + "<pre>")
            res.end()
        })

    }

    else if(regexGenero.test(q.pathname)){
        const axios = require("axios")
        axios.get("http://localhost:3000" + q.pathname)
        .then(resp=> {
            dados = resp.data;
            pagHTML= geraGenero(dados)
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(pagHTML)
            res.end()
        })
        .catch(error=>{
            res.writeHead(500,{"Content-Type": "text/html"})
            res.write("<pre>" + error + "<pre>")
            res.end()
        })


    }
    else if(q.pathname == "/w3.css"){
        fs.readFile("w3.css",function(err,data){
            res.writeHead(200,{"Content-Type": "text/css"})
            res.write(data)
            res.end()
        }) 

    }

    else{
        //Bad request=400 servico é suportado
        res.writeHead(400,{"Content-Type": "text/html; charseet=utf-8"})
        res.write("<p>Erro: pedido nao suportado.</p>")
        res.write("<pre>" + q.pathname + "</pre")
        res.end()
    }
    console.log(q.pathname)
}).listen(7777)

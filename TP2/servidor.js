var http= require("http")
var fs = require("fs")
var url = require("url")

http.createServer(function(req,res){

    //Construtor de regex em js //
    var regex= /^\/c\d+$/ 
    var q=url.parse(req.url, true)
    console.log(q.pathname)
    if(q.pathname=="/"){
        fs.readFile("index.html",function(err,data){
            res.writeHead(200,{"Content-Type": "text/html; charseet=utf-8"})
            res.write(data)
            res.end()
        })

    }
    else if (regex.test(q.pathname)){
        //Corre de forma assincrona
        fs.readFile("./Paginas/" + q.pathname.substring(1) + ".html",function(err,data){
            res.writeHead(200,{"Content-Type": "text/html; charseet=utf-8"})
            res.write(data)
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
    
}).listen(3000)
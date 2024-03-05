var http = require('http')
var axios = require('axios')
var templates = require('./templates') 
var static = require('./static')  
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}



// Server creation

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if(req.url=="/"){
                    res.writeHead(200,{"Content-Type": "text/html"})
                    res.write(templates.paginaPrincipal(d))
                    res.end()

                }
                else if(req.url== "/compositores"){
                    axios.get("http://localhost:3000/compositores").then(response =>{
                        res.writeHead(200,{"Content-Type": "text/html"})
                        res.write(templates.compositoresListPage(response.data,d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(520,{"Content-Type": "text/html"})
                        res.end(templates.errorPage(erro,d))

                        
                    })
                }
                // GET /periodos --------------------------------------------------------------------
                else if(req.url== "/periodos"){
                    axios.get("http://localhost:3000/periodos").then(response =>{
                        res.writeHead(200,{"Content-Type": "text/html"})
                        res.write(templates.periodosListPage(response.data,d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(520,{"Content-Type": "text/html"})
                        res.write(templates.errorPage(erro,d))
                        res.end()

                        
                    })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/C\d+/.test(req.url)){
                    axios.get("http://localhost:3000"+req.url).then(response =>{
                        res.writeHead(200,{"Content-Type": "text/html"})
                        res.write(templates.compositorPage(response.data,d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(520,{"Content-Type": "text/html"})
                        res.write(templates.errorPage(erro,d))
                        res.end()

                        
                    })
                }
                // GET /periodos/:id --------------------------------------------------------------------
                else if(/\/periodos\/P\d+/.test(req.url)){
                    axios.get("http://localhost:3000"+req.url).then(response =>{
                        res.writeHead(200,{"Content-Type": "text/html"})
                        res.write(templates.periodoPage(response.data,d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(520,{"Content-Type": "text/html"})
                        res.write(templates.errorPage(erro,d))
                        res.end()

                        
                    })
                }
                // GET /compositores/registo --------------------------------------------------------------------
                else if(req.url== "/compositores/registo"){
                    res.writeHead(200,{"Content-Type": "text/html"})
                    res.write(templates.compositorFormPage(d))
                    res.end()
                }
                // GET /periodos/registo --------------------------------------------------------------------
                else if(req.url== "/periodos/registo"){
                    res.writeHead(200,{"Content-Type": "text/html"})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }

                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C\d+/.test(req.url)){
                    var partes= req.url.split('/')
                    var idAluno= partes[partes.length-1]
                    axios.get("http://localhost:3000/compositores/"+ idAluno).then(response =>{
                        res.writeHead(200,{"Content-Type": "text/html"})
                        res.write(templates.compositorFormEditPage(response.data,d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(520,{"Content-Type": "text/html"})
                        res.write(templates.errorPage(erro,d))
                        res.end()

                        
                    })
                }

                // GET /periodos/edit/:id --------------------------------------------------------------------
                else if(/\/periodos\/edit\/P\d+/.test(req.url)){
                    var partes= req.url.split('/')
                    var idAluno= partes[partes.length-1]
                    axios.get("http://localhost:3000/periodos/"+ idAluno).then(response =>{
                        res.writeHead(200,{"Content-Type": "text/html"})
                        res.write(templates.periodoFormEditPage(response.data,d))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(520,{"Content-Type": "text/html"})
                        res.write(templates.errorPage(erro,d))
                        res.end()

                        
                    })
                }

                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if(/\/compositores\/delete\/C\d+/.test(req.url)){
                    var partes= req.url.split('/')
                    var idAluno= partes[partes.length-1]
                    axios.delete("http://localhost:3000/compositores/"+idAluno).then(response =>{
                        res.writeHead(200,{"Content-Type": "text/html"})
                        res.end(templates.compositorPage(response.data,d))
                    })
                    .catch(erro => {
                        res.writeHead(521,{"Content-Type": "text/html"})
                        res.write(templates.errorPage(erro,d))
                        res.end()
                    })
                }

                // GET /periodos/delete/:id --------------------------------------------------------------------
                else if(/\/periodos\/delete\/P\d+/.test(req.url)){
                    var partes= req.url.split('/')
                    var idAluno= partes[partes.length-1]
                    axios.delete("http://localhost:3000/periodos/"+idAluno).then(response =>{
                        res.writeHead(200,{"Content-Type": "text/html"})
                        res.end(templates.periodoPage(response.data,d))
                    })
                    .catch(erro => {
                        res.writeHead(521,{"Content-Type": "text/html"})
                        res.write(templates.errorPage(erro,d))
                        res.end()
                    })
                }

                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404,{"Content-Type":"text/html"})
                    res.end(templates.errorPage(`Pedido GET nao suportado: ${req.url}`, d))
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == "/compositores/registo"){
                    collectRequestBodyData(req,result =>{
                        if(result){
                            axios.post("http://localhost:3000/compositores",result)
                            .then(response =>{
                                res.writeHead(201,{"Content-Type": "text/html"})
                                res.write(templates.compositorPage(response.data,d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(520,{"Content-Type": "text/html"})
                                res.write(templates.errorPage(erro,d))
                                res.end()
        
                                
                            })
                        }
                        else{
                            res.writeHead(201,{"Content-Type":"text/html"})
                            res.write("<p> Unable to collect data from body </p>")
                        }

                    })
                }
                // POST /periodos/registo --------------------------------------------------------------------
                else if(req.url == "/periodos/registo"){
                    collectRequestBodyData(req,result =>{
                        if(result){
                            axios.post("http://localhost:3000/periodos",result)
                            .then(response =>{
                                res.writeHead(201,{"Content-Type": "text/html"})
                                res.write(templates.periodoPage(response.data,d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(520,{"Content-Type": "text/html"})
                                res.write(templates.errorPage(erro,d))
                                res.end()
        
                                
                            })
                        }
                        else{
                            res.writeHead(201,{"Content-Type":"text/html"})
                            res.write("<p> Unable to collect data from body </p>")
                        }

                    })
                }
                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C\d+/.test(req.url)){
                    var partes= req.url.split('/')
                    var idAluno= partes[partes.length-1]
                    collectRequestBodyData(req,result =>{
                        if(result){
                            axios.put("http://localhost:3000/compositores/"+idAluno,result)
                            .then(response =>{
                                res.writeHead(201,{"Content-Type": "text/html"})
                                res.write(templates.compositorPage(response.data,d))
                                res.end()
                            })
                            .catch(err => {
                                res.writeHead(520,{"Content-Type": "text/html"})
                                res.write(templates.errorPage(erro,d))
                                res.end()
        
                                
                            })
                        }
                        else{
                            res.writeHead(201,{"Content-Type":"text/html"})
                            res.write("<p> Unable to collect data from body </p>")
                        }

                    })
                }
                // POST /periodos/edit/:id --------------------------------------------------------------------
                else if(/\/periodos\/edit\/P\d+/.test(req.url)){
                    var partes= req.url.split('/')
                    var idAluno= partes[partes.length-1]
                    collectRequestBodyData(req,result =>{
                        if(result){
                            axios.put("http://localhost:3000/periodos/"+idAluno,result)
                            .then(response =>{
                                res.writeHead(201,{"Content-Type": "text/html"})
                                res.write(templates.periodoPage(response.data,d))
                                res.end()
                            })
                            .catch(err => {
                                res.writeHead(520,{"Content-Type": "text/html"})
                                res.write(templates.errorPage(erro,d))
                                res.end()
        
                                
                            })
                        }
                        else{
                            res.writeHead(201,{"Content-Type":"text/html"})
                            res.write("<p> Unable to collect data from body </p>")
                        }

                    })
                }


                // POST ? -> Lancar um erro
                else{
                    res.writeHead(404,{"Content-Type":"text/html"})
                    res.end(templates.errorPage(`Pedido POST nao suportado: ${req.url}`, d))
                }
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

compositoresServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
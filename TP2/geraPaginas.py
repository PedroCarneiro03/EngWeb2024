import json


f=open("mapa-virtual.json","r")

data = json.load(f)


prehtml=f"""
<!DOCTYPE html>
<html>
    <head>
        <title> c1 </title>
        <link rel="stylesheet" href="w3.css">
        <meta charset="UTF-8">
    </head>
    <body>

"""

posthtml =f"""


    </body>
</html>
"""



def encontraVizinhos(id):
    res=[]
    for linha in data["ligacoes"]:
        if linha["destino"]==id:
            res.append(linha["origem"])

    return res

def idToNome(id):
    for linha in data["cidades"]:
        if linha["id"]==id:
            return linha["nome"]
    return "Cidade nao encontrada"


for linha in data["cidades"]:
    f= open("./Paginas/"+ linha["id"] + ".html","w")
    #f.write(linha)
    conteudo = f"""
        <p><b> Nome: </b>{linha["nome"]}</p>
        <p><b> Id: </b>{linha["id"]}</p>
        <p><b> Distrito: </b>{linha["distrito"]}</p>
        <p><b> Populacao: </b>{linha["população"]}</p>
        <ul class="w3-ul">
    """
    for viz in encontraVizinhos(linha["id"]):
       conteudo +=f"""<li><a href= http://localhost:3000/{viz}>{idToNome(viz)}</a></li>\n"""

    conteudo += "</ul>"
    f.write(prehtml + conteudo + posthtml)


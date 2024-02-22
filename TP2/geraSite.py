import json


f=open("mapa-virtual.json","r")

data = json.load(f)


prehtml=f"""
<!DOCTYPE html>
<html>
    <head>
        <title> Gerenciador de Cidades </title>
        <link rel="stylesheet" href="w3.css">
        <meta charset="UTF-8">
    </head>
    <body>
        <ul class="w3-ul">

"""

posthtml =f"""

        </ul>
    </body>
</html>
"""

conteudo=""
for linha in data["cidades"]:
    conteudo+=f"""<li class=w3-hover-red><a href=http://localhost:3000/{linha["id"]}>{linha["nome"]}</a></li>\n"""

html= prehtml + conteudo + posthtml
f=open("index.html","w")
f.write(html)

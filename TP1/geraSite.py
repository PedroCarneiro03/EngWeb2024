
import json,os,re

def filtrar_nome_arquivo(nome_arquivo):
    # Expressão regular para encontrar o padrão desejado
    padrao = r'MRB-(\d+)-(.*).xml'
    
    # Tenta encontrar uma correspondência com o padrão
    correspondencia = re.match(padrao, nome_arquivo)
    
    if correspondencia:
        # Retorna a parte do número e do nome encontrados
        numero = correspondencia.group(1)
        nome = correspondencia.group(2)
        return f"{numero}-{nome}"
    else:
        return None

def extrair_numero_do_arquivo(nome_arquivo):
    # Expressão regular para encontrar o número no padrão desejado
    padrao = r'MRB-(\d+)-.*\.xml'
    
    # Tenta encontrar uma correspondência com o padrão
    correspondencia = re.match(padrao, nome_arquivo)
    
    if correspondencia:
        # Retorna o número encontrado
        numero = correspondencia.group(1)
        return numero
    else:
        return None

diretorio = './MapaRuas-materialBase/texto/'

arquivos = os.listdir(diretorio)
arquivos.sort()




preHTML="""
<!DOCTYPE html>
<html>
    <head>
        <title>Ruas de Braga</title>
        <link rel="stylesheet" href="w3.css">
        <meta charset="UTF-8">
    </head>

    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Ruas de Braga</h1>
            </header>
            <ul class="w3-ul w3-card-4" style="width:50%">
        

    
"""
posHTML="""
            </ul>
            <footer class="w3-container w3-blue">
                <h5>Criado por Pedro Carneiro</h5>
            </footer>
        </div>
    </body>
</html>
"""
conteudo=""

for arquivo in arquivos:


    conteudo += f"""<li><a href= "./PaginasHTML/rua{extrair_numero_do_arquivo(arquivo)}.html">{filtrar_nome_arquivo(arquivo)}</li>"""


paginaHTML= preHTML + conteudo + posHTML
f= open("./index.html",'w')
f.write(paginaHTML)
f.close()






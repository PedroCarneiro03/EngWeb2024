import json,os,re
import xml.etree.ElementTree as ET


def escreveParagrafos(elemento):
    html=""
    html += f'<p>'     
    for element in elemento.iter():
        if element.tag == 'lugar':
            html += f'{element.text}'
            html += str(element.tail)
        elif element.tag == 'data':
            html += f'{element.text}'
            html += str(element.tail)
        else:
            html += str(element.text)
    html += f'</p>\n'
    return html


def gerar_pagina_html(arquivo_xml):
    # Parseia o XML
    tree = ET.parse("./MapaRuas-materialBase/texto/" + arquivo_xml)
    root = tree.getroot()

    # Criação do HTML
    html = '<!DOCTYPE html>\n'
    html += '<html lang="en">\n'
    html += '<head>\n'
    html += '<meta charset="UTF-8">\n'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    html += f'<title>{arquivo_xml}</title>\n'
    html += '</head>\n'
    html += '<body>\n'

    # Adiciona a meta informação
    meta = root.find('meta')
    numero = meta.find('número').text
    nome = meta.find('nome').text
    html += f'<h1>Rua {numero}: {nome}</h1>\n'

    # Adiciona o corpo do XML ao HTML
    html += '<div>\n'
    corpo = root.find('corpo')
    for elemento in corpo:
        if elemento.tag == 'figura':
            imagem = elemento.find('imagem').attrib['path']
            legenda = elemento.find('legenda').text
            imagem_path= imagem[3:]
            html += f'<figure>\n'
            html += f'<img src=../MapaRuas-materialBase/{imagem_path} alt="{legenda}">\n'
            html += f'<figcaption>{legenda}</figcaption>\n'
            html += f'</figure>\n'
            os.chdir(os.path.dirname(__file__))
        elif elemento.tag == 'para':
            html+= escreveParagrafos(elemento)
        elif elemento.tag == 'lista-casas':
            html += '<ul>\n'
            for casa in elemento.findall('casa'):
                numero_casa = casa.find('número').text
                if casa.find('enfiteuta') is not None:
                    enfiteuta = casa.find('enfiteuta').text
                else:
                    enfiteuta = "N/A"

                if casa.find('foro') is not None:
                    foro = casa.find('foro').text
                else:
                    foro="N/A"

                if casa.find('desc') is not None:
                    for elem in casa.find('desc'):
                        desc= escreveParagrafos(elem)
                else:
                    desc="N/A"
                    
                html += f'<li>Número da casa: {numero_casa}, Enfiteuta: {enfiteuta}, Foro: {foro}, Descricao: {desc}</li>\n'
            html += '</ul>\n'

    html += '</div>\n'

    html += '</body>\n'
    html += '</html>\n'
    return html

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

for arquivo in arquivos:

    paginaHTML= gerar_pagina_html(arquivo)

    pathF=f"./PaginasHTML/rua{extrair_numero_do_arquivo(arquivo)}.html"
    f= open(pathF,'w')
    f.write(paginaHTML)
    f.close()
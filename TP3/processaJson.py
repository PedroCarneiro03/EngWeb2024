



import json


def criaFilmes(path):

    f= open(path,"r")
    filmes=[]
    for linha in f:
        item=json.loads(linha)
        #ha registos sem generos
        if("genres" in item):
            res={
                "id": item["_id"]["$oid"],
                "titulo": item["title"],
                "ano":item["year"],
                "atores":item["cast"],
                "generos":item["genres"]
            }
            filmes.append(res)
        else:
            res={
                "id": item["_id"]["$oid"],
                "titulo": item["title"],
                "ano":item["year"],
                "atores":item["cast"],
                "generos":[]
            }
            filmes.append(res)
    return filmes

def adicionaFilme(ator,atores,titulo):
    for dicionario in atores:
        if dicionario["nome"]==ator:
            if titulo not in dicionario["filmes"]:
                dicionario["filmes"].append(titulo)
            break


def criaAtores(filmes):
    listaAtores=[]
    id=1
    atores=[]
    for reg in filmes:
        for ator in reg["atores"]:
            if ator not in listaAtores:
                listaAtores.append(ator)
                #print(listaAtores)
                res={"id":"a"+str(id),
                    "nome":ator,
                    "filmes":[]
                }
                id+=1
                atores.append(res)
            #Acrescentar o filme a lista desse ator
            adicionaFilme(ator,atores,reg["titulo"])
    return atores


def pertence (gen, generos):
    b = False
    for g in generos:
        if g["designacao"] == gen:
            b=True
            break
    return b

def criaGeneros(filmes):
    generos=[]
    id=1
    for registo in filmes:
        for gen in registo["generos"]:
            if not pertence(gen,generos):
                res={"id":"g"+str(id),
                     "designacao": gen               
                }
                id+=1
                generos.append(res)

    return generos

filmes= criaFilmes("filmes.json")
atores = criaAtores(filmes)
generos = criaGeneros(filmes)

res={"filmes":filmes,
"atores":atores,
"generos":generos
}
f=open("dados.json","w")
json.dump(res,f)


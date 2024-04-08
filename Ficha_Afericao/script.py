import requests
import json
from bson import ObjectId


# URL da sua API REST para adicionar registros
api_url = 'http://localhost:7777/pessoas'

# Caminho para o arquivo JSON contendo os dados a serem adicionados
dataset_file = 'dataset-extra3.json'



def adicionar_registro(registro):
    headers = {'Content-Type': 'application/json'}
    response = requests.post(api_url, data=json.dumps(registro), headers=headers)
    if response.status_code == 201:
        print('Registro adicionado com sucesso:', registro)
    else:
        print('Erro ao adicionar registro:', response.text)

def main():
    with open(dataset_file, 'r') as file:
        dataset = json.load(file)
        for registro in dataset["pessoas"]:
            registro['_id'] = str(ObjectId())
            registro['morada']["_id"] = str(ObjectId())
            registro['partido_politico']["_id"] = str(ObjectId())
            registro['atributos']["_id"] = str(ObjectId())
            adicionar_registro(registro)
            #print(registro)

if __name__ == '__main__':
    main()


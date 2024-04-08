import requests
import json


# URL da sua API REST para adicionar registros
api_url = 'http://localhost:7777/pessoas'




def encontrar_modalidades_nao_repetidas():
    response = requests.get(api_url)
    if response.status_code == 200:
        # Se a solicitação for bem-sucedida, obtemos os dados da resposta
        dados = response.json()
        # Inicializa uma lista para armazenar todas as modalidades
        modalidades_e_pessoas = {}
        # Itera sobre cada pessoa nos dados retornados
        for pessoa in dados:
            # Para cada pessoa, obtém a lista de desportos
            desportos = pessoa.get('desportos', [])
            nome = pessoa.get('_id', 'Nome Desconhecido')
            # Adiciona os desportos à lista de modalidades
            for modalidade in desportos:
                # Adiciona o nome da pessoa à lista de pessoas associadas a essa modalidade
                if modalidade not in modalidades_e_pessoas:
                    modalidades_e_pessoas[modalidade] = [nome]
                else:
                    modalidades_e_pessoas[modalidade].append(nome)
        return modalidades_e_pessoas
    else:
        # Se a solicitação não for bem-sucedida, imprime a mensagem de erro
        print('Erro ao fazer solicitação GET para /pessoas:', response.text)
        return {}

def main():
    modalidades = encontrar_modalidades_nao_repetidas()
    print(modalidades)
    
    

    with open('modalidades.json', 'w') as file:

        for modalidade in modalidades:
            file.write[""]
        json.dump(modalidades, file)

if __name__ == "__main__":
    main()
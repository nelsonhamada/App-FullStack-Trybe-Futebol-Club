# Trybe Futebol Club

Utilizando SOLID em POO foi desenvolvida uma aplicação Full Stack que simula um site informativo sobre partidas e classificações de futebol! ⚽️
Onde você pode editar ou finalizar jogos em andamentos, conferir placares de líderes, inclusive aplicar filtros de jogos em casa ou fora.
Foi criado uma API-Restful em Node com Typescript que utiliza o Sequelize para persistir os dados em SQL e popular o Front-end.

## Tecnologias Utilizadas:
- Docker;
- TypeScript
- MySQL;
- Sequelize;
- JSON wetoken;
- Bcrypt;
- Jest;
- React;
- Axios;

# Funcionamento:
![tfc-funcionamento](https://github.com/nelsonhamada/nelson-hamada-API-Trybe-Futebol-Club/assets/122186559/25978e7c-4062-49f9-8148-e451aecf5a20)


## Comandos Úteis:
Para rodar a aplicação em sua máquina clone o repositório: 
```
bash
git clone git@github.com:nelsonhamada/nelson-hamada-API-Trybe-Futebol-Club.git
```

Entre no diretório clonado e instale as dependências:
```
cd Trybe-Futebol-Club
npm run install:apps
```

Entre no diretório app para subir o container docker com:
```
cd app
docker-compose up --build
```

O Front-end da aplicação estará rodando na porta 3000 da sua máquina;

O Back-end da aplicação estará na porta 3001 da sua máquina;

O Banco de Dados estará na porta 3306 da sua máquina.

>Nota: É necessário que essas portas estejam livres para que o Docker consiga subir o container.

Faça login como admin e teste todas funcionalidades da aplicação.
email: admin@admin.com
senha: secret_admin

>Nota: mais informações sobre usuários em app/backend/database/seeders/20211205212238-user.ts



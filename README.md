# apiverdadeslides

--npm start -y
-- npm i dotenv sequelize mysql2 body-parser express cors socket.io multer
-- npm i --save-dev nodemon

O arquivo config.json possui as configurações de conexão ao banco. O sequelize utilizará esses parâmetros para fazer os processos de migration e seeder, conforme comandos abaixo.

# 1 - Criar o banco

5
--npx sequelize-cli db:create

# 2 - Criar as tabelas

--npx sequelize-cli db:migrate

# 3 - Alimentar as tabelas com o que está na pasta seeders

-- npx sequelize-cli db:seed:all

# Rotas para Bíblia

Nome e Versão devem ser abreviados, estes parâmetros são obrigatórios
Capítulo e Versículo são inteiros

/biblia/livros - lista todos os livros, com quantidade de capítulos
/biblia/livro?v=versao&nome=nomelivro&cap=capitulo&ver=versiculo - lista textos dos versículos
/biblia/versao - lista as versões

#Rotas para Arquivo

-- Criar arquivo
/arquivos - POST - como formulário multipart
{
'nome' : '',
'caminho' : '',
'tipo' : '',
'file' : arquivo de upload
}

-- Ver arquivos
/arquivos - lista todos os arquivos
/arquivos?tipo= lista os arquivos que possuem somente o tipo definido
/arquivos/id lista o arquivo possuidor do id informado

-- Editar Arquivo

/arquivos/id - PUT
{
'nome' : '',
}

-- Apagar Arquivo

/arquivos/id - DELETE

Na pasta raiz contém o arquivo biblia_13V.sql, que contém as estruturas de conteúdo para a Bíblia, para inserir o conteúdo do arquivo .sql no banco de dados, utilizar o comando abaixo. Caso o banco já exista, é necessário editar no arquivo .sql, informando o nome do banco antes de realizar o comando abaixo.

mysql -u root -p musicas < biblia_13V.sql

Para o caso do windows, rodar mysql.exe (caminho completo para o executável)

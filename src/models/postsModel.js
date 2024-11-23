// Importa a função `conectarAoBanco` do arquivo 'dbConfig.js' localizado na pasta 'src/config'
import conectarAoBanco from "../config/dbConfig.js";
// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão obtida da variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados MongoDB
export default async function getTodosPosts() {
    // Conecta ao banco de dados 'imersao-instabytes'
    const db = conexao.db("imersao-instabytes");

    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");

    // Executa uma consulta para buscar todos os documentos da coleção 'posts'
    // O método `toArray()` converte o cursor de resultados em um array de objetos
    return colecao.find().toArray();
}
import 'dotenv/config';
// Importa a função `conectarAoBanco` do arquivo 'dbConfig.js' localizado na pasta 'src/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão obtida da variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados MongoDB
export async function getTodosPosts() {
    // Conecta ao banco de dados 'imersao-instabytes'
    const db = conexao.db("imersao-instabytes");

    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");

    // Executa uma consulta para buscar todos os documentos da coleção 'posts'
    // O método `toArray()` converte o cursor de resultados em um array de objetos
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    // Obtém o banco de dados
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção de posts
    const colecao = db.collection("posts");
    // Insere um novo post
    return colecao.insertOne(novoPost);
  }

  export async function attPost(id, novoPost) {
    // Obtém o banco de dados
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção de posts
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    // Atualiza um post
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
  }
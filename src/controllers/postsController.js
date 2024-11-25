import fs from "fs" // Importa o módulo do sistema de arquivos
import {getTodosPosts, criarPost, attPost} from "../models/postsModel.js"; // Importa funções para gerenciar posts
import gerarDescricaoComGemini from "../services/geminiSrv.js";

// Lista todos os posts
export async function listarPosts(req, res) {
    // Busca todos os posts do banco de dados
    const posts = await getTodosPosts();
    // Retorna os posts em formato JSON com status 200
    res.status(200).json(posts);
}

// Cria um novo post
export async function postarNovoPost(req, res) {
    const novoPost = req.body; // Obtém as informações do novo post
    try {
        const postCriado = await criarPost(novoPost); // Insere o post no banco de dados
        res.status(200).json(postCriado); // Retorna o post criado
    } catch(erro) {
        console.error(erro.message); // Imprime o erro no console
        res.status(500).json({"Erro":"Falha na requisição"}) // Retorna um erro 500
    }
}

// Cria um novo post com uma imagem
export async function uploadImagem(req, res) {
    const novoPost ={
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await criarPost(novoPost); // Insere o post no banco de dados
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Cria o novo nome da imagem
        fs.renameSync(req.file.path, imagemAtualizada); // Renomeia a imagem
        res.status(200).json(postCriado); // Retorna o post criado
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function attNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const postAtt = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await attPost(id, postAtt); // Insere o post no banco de dados
        res.status(200).json(postCriado); // Retorna o post criado
    } catch(erro) {
        console.error(erro.message); // Imprime o erro no console
        res.status(500).json({"Erro":"Falha na requisição"}) // Retorna um erro 500
    }
}
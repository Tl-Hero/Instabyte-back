import getTodosPosts from "../models/postsModel.js";

export async function listaPosts(req, res) {

    //Chama a função 'getTodosPosts' de forma assíncrona para obter todos os posts
    const posts = await getTodosPosts();

    // Envia uma resposta HTTP com status 200 (sucesso) - Retorna os posts como JSON no corpo da resposta
    res.status(200).json(posts);
    }
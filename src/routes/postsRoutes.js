import express from "express"; // Importa o framework Express para criar a API
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos

import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js"; // Importa funções para gerenciar posts do arquivo postsController.js

// Configura o armazenamento de arquivos usando o Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // Define o diretório de destino para os arquivos
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) { // Define o nome do arquivo salvo
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage }); // Cria uma instância do Multer com as configurações de armazenamento

// Define as rotas da API
const routes = (app) => {
    // Permite que o Express entenda requisições com corpo no formato JSON
    app.use(express.json());

    // Rota para listar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);

    // Rota para fazer upload de uma imagem
    app.post("/upload", upload.single("imagem"), uploadImagem); // O middleware 'upload.single("imagem")' trata o upload da imagem
};

// Exporta a função 'routes' para ser usada em outros módulos
export default routes;
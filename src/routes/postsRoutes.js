import express from "express"
import { listaPosts } from "../controllers/postsController.js";

const routes = (app) => {
    // Retorna Json no app
    app.use(express.json());
    // retorna todos os posts -- Importa as dependências necessárias (assumindo que 'getTodosPosts' está definido em outro módulo)
    app.get("/posts", listaPosts);
}

export default routes;
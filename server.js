// Importa o módulo Express para criar a aplicação web
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do Express e a armazena na variável 'app'
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000
// A função de callback é executada quando o servidor está ouvindo
app.listen(3000, () => {
    // Mensagem de log para indicar que o servidor está escutando
    console.log("Servidor escutando...");
});
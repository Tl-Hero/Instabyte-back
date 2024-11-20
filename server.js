// Importa o módulo Express para criar a aplicação web
import express from "express";

// Cria uma instância do Express e a armazena na variável 'app'
const app = express();

// Inicia o servidor na porta 3000
// A função de callback é executada quando o servidor está ouvindo
app.listen(3000, () => {
    // Mensagem de log para indicar que o servidor está escutando
    console.log("Servidor escutando...");
});

app.get("/api", (req, res) => {
    res.status(200).send("KAAWABUNGA!!!!");
});
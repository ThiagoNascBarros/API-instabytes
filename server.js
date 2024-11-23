// Importa o módulo express
import express from "express"; 
import routes from "./src/routes/postsRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

// Cria uma instância do express
const app = express(); 
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
    // Exibe uma mensagem no console quando o servidor está conectado
    console.log(`Servidor conectado na porta ${PORT}`); 
});

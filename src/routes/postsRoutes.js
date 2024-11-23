// Imports de bibliotecas
import express from "express";
import multer from "multer";
import cors from "cors";

import { listPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest:"./uploads", storage});

const routes = (app) => {
    // Configura o express para usar JSON
    app.use(express.json()); 
    app.use(cors(corsOptions))
    // Define uma rota GET para "/posts"
    app.get("/posts", listPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    // Rota para atualizar um post
    app.put("/upload/:id", atualizarNovoPost)
} 

export default routes;
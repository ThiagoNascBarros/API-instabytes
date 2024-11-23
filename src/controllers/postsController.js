import fs from 'fs';
import {getPosts, criarPost, atualizarPost} from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPosts(req, res) { 
    // Obtém os posts chamando a função getPosts
    const posts = await getPosts(); 
    // Retorna os posts em formato JSON com status 200
    res.status(200).json(posts); 
}

export async function postarNovoPost(req, res){
     const novoPost = req.body;
     try{
         const postCriado = await criarPost(novoPost)
         res.status(200).json(postCriado);        
     } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro:":"Falha na requisição"});   
     }
 }

export async function uploadImagem(req, res){
     const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
     };

     try{
         const postCriado = await criarPost(novoPost);
         const imgAtulizado = `uploads/${postCriado.insertedId}.png`
        //  Renomeando as imagens 
         fs.renameSync(req.file.path, imgAtulizado)
         res.status(200).json(postCriado);        
     } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro:":"Falha na requisição"});   
     }
 }

 export async function atualizarNovoPost(req, res){
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro){
       console.error(erro.message);
       res.status(500).json({"Erro:":"Falha na requisição"});   
    }
}

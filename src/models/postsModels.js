import 'dotenv/config';

// Importa a função conectarBanco do arquivo dbconfig.js
import { MongoAPIError, ObjectId } from "mongodb";
import conectarBanco from "../config/dbconfig.js"; 

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarBanco(process.env.STRING_CONEXAO); 

// Define uma função assíncrona para obter posts
export async function getPosts(){ 
    // Seleciona o banco de dados "imersao-instabyte"
    const db = conexao.db("imersao-instabyte"); 
    // Seleciona a coleção "posts" do banco de dados
    const collection = db.collection("posts"); 
    // Retorna todos os documentos da coleção como um array
    return collection.find().toArray(); 
}

export async function criarPost(novoPost){
    const db = conexao.db("imersao-instabyte"); 
    const collection = db.collection("posts"); 
    return collection.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost){
    const db = conexao.db("imersao-instabyte"); 
    const collection = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objectId)}, {$set:novoPost});
}
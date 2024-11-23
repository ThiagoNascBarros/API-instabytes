import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'; // Importa dotenv

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

export default async function conectarBanco() {
    const stringConexao = process.env.STRING_CONEXAO; // Defina a string de conexão aqui
    let mongoClient;

    // Verifique se a string de conexão está definida
    if (!stringConexao) {
        console.error('A string de conexão com o banco de dados não está definida.');
        process.exit(1); // Saia com um código de erro
    }

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso...');

        return mongoClient;
    } catch (erro) {
        console.error('Falha na conexão com o banco!', erro);
        process.exit(1); // Saia com um código de erro
    }
}
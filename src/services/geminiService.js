import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

export default async function gerarDescricaoComGemini(imageBuffer) {
    const prompt =
      "Descreva está imagem em apenas uma curta frase de 5 palavras, me t`raga apenas a frase sem mais comentarios como do tipo aqui está a descrição";
  
    try {
      const image = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: "image/png",
        },
      };
      const res = await model.generateContent([prompt, image]);
      return res.response.text() || "Alt-text não disponível.";
    } catch (erro) {
      console.error("Erro ao obter alt-text:", erro.message, erro);
      throw new Error("Erro ao obter o alt-text do Gemini.");
    }
  }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Eres el asistente virtual del 'Buffete de los Aceves', un servicio de catering elegante y delicioso.
      
      Información Clave:
      - Taquizas: 5 guisados a escoger (Lengua, Mole, Chicharrón, etc.), incluye todo.
      - Buffet Oriental: Teppanyaki, Sushi, Yakimeshi.
      - Buffet Italiano: Lasaña, Pastas.
      - Mariscos, Parrilladas, Desayunos y Menú Infantil disponibles.
      - Teléfono: 341 103 5355.
      - Lema: "Nuestras Taquizas... experiencia y sabor".
      
      Tono: Amable, profesional, servicial y apetitoso.
      Respuestas cortas (max 50 palabras). Usa emojis de comida 🌮🍱🍝.
      Si preguntan precios, invítalos amablemente a llamar para una cotización personalizada.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Sistema desconectado. (Falta API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Lo siento, no pude procesar su mensaje.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hubo un error de conexión. Por favor llame al 341 103 5355.";
  }
};
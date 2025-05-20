// plugins/chatgpt-loquillo.js
import axios from 'axios';
import { areJidsSameUser } from '@whiskeysockets/baileys';

const openai_api_key = 'TU_API_KEY_AQUÍ'; // Reemplaza con tu clave de OpenAI

const handler = async (m, { conn }) => {
  const text = m.text?.trim();
  const sender = m.sender;

  // Detectar si mencionaron al bot
  const botNumber = conn.user.id.split(':')[0];
  const mencionado = (m.mentionedJid || []).some(jid => areJidsSameUser(jid, botNumber));

  if (!mencionado) return; // Si no lo mencionan, no dice ni pío

  if (!text || text.length < 2) return;

  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Eres un compa loquillo, divertido y buena onda. Estás en un grupo de WhatsApp y cuando alguien te menciona, respondes como si estuvieras cotorreando con tus panas. Eres gracioso, usas palabras como "bro", "jajaja", "mi rey", "no inventes", "al chile", "crack", etc., pero también eres buena vibra. No eres grosero ni ofensivo.`
        },
        { role: 'user', content: text }
      ],
      temperature: 0.85,
    }, {
      headers: {
        'Authorization': `Bearer ${openai_api_key}`,
        'Content-Type': 'application/json'
      }
    });

    const respuesta = res.data.choices[0].message.content.trim();
    await conn.reply(m.chat, respuesta, m, { mentions: [sender] });

  } catch (err) {
    console.error('Error hablando como loquillo:', err);
    await conn.reply(m.chat, 'Se me fundió el cerebro un momento, bro. Intenta luego.', m);
  }
};

// Siempre escucha todo, sin comandos ni prefijos
handler.customPrefix = /.*/;
handler.command = new RegExp();
handler.tags = ['loquillo'];
handler.group = false; // Cambia a true si solo quieres que funcione en grupos

export default handler;
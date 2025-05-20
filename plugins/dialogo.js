// plugins/dialogo.js
const respuestas = [
  { pattern: /^(hola|holi|holaa)$/i, replies: [
    sender => `Hola, ¿cómo estás, @${sender.split('@')[0]}?`,
    sender => `¡Hey! ¿Qué tal, @${sender.split('@')[0]}?`,
    sender => `Hola hola, @${sender.split('@')[0]}!`
  ]},
  { pattern: /^(buenos días|buen día)$/i, replies: [
    sender => `¡Buenos días, @${sender.split('@')[0]}! Que tengas un gran día.`,
    sender => `Buenos días, @${sender.split('@')[0]}! ¿Cómo amaneciste?`
  ]},
  { pattern: /^(buenas tardes)$/i, replies: [
    sender => `Buenas tardes, @${sender.split('@')[0]}! ¿Qué tal todo?`,
    sender => `¡Buenas tardes! Espero que estés bien, @${sender.split('@')[0]}`
  ]},
  { pattern: /^(buenas noches)$/i, replies: [
    sender => `Buenas noches, @${sender.split('@')[0]}! Que descanses.`,
    sender => `Que tengas buenas noches, @${sender.split('@')[0]}!`
  ]},
  { pattern: /gracias|thank you/i, replies: [
    () => `De nada, ¡para eso estoy!`,
    () => `No hay de qué, siempre aquí para ayudarte.`
  ]},
  { pattern: /adiós|chao|bye/i, replies: [
    sender => `¡Hasta luego, @${sender.split('@')[0]}! Cuídate mucho.`,
    sender => `Nos vemos pronto, @${sender.split('@')[0]}!`
  ]},
  { pattern: /cómo estás|cómo te va|qué tal/i, replies: [
    sender => `Estoy bien, gracias por preguntar, @${sender.split('@')[0]}. ¿Y tú?`,
    sender => `Muy bien, @${sender.split('@')[0]}! ¿Y tú qué tal?`
  ]},
  { pattern: /qué haces|qué tal/i, replies: [
    () => `Aquí, siempre listo para ayudarte.`,
    () => `Pensando en cómo ayudarte mejor, ¿y tú?`
  ]}
];

function elegirRespuesta(array, sender) {
  const r = array[Math.floor(Math.random() * array.length)];
  return typeof r === 'function' ? r(sender) : r;
}

const handler = async (m, { conn }) => {
  const text = m.text || '';
  const sender = m.sender;

  for (const { pattern, replies } of respuestas) {
    if (pattern.test(text)) {
      const reply = elegirRespuesta(replies, sender);
      await conn.reply(m.chat, reply, m, { mentions: [sender] });
      break;
    }
  }
};

handler.customPrefix = /.*/;
handler.command = new RegExp();
handler.tags = ['dialogo'];
handler.group = false;

export default handler;
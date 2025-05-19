let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!(m.chat in global.db.data.chats)) {
    return conn.reply(m.chat, `🤖¡Este chat no está registrado!.`, m);
  }

  let chat = global.db.data.chats[m.chat];

  if (command === 'bot') {
    if (args.length === 0) {
      const estado = chat.isBanned ? '✗ Desactivado' : '✓ Activado';
      const info = `
「✦」Un admin puede activar o desactivar a *${botname}* :

> ✐ *${usedPrefix}bot on*  Activar
> ✐ *${usedPrefix}bot off* Desactivar

✧ Estado actual » *${estado}*
`;
      return conn.reply(m.chat, info, m);
    }

    if (args[0] === 'off') {
      if (chat.isBanned) {
        return conn.reply(m.chat, `🤖 ${botname} ya estaba desactivado.`, m);
      }
      chat.isBanned = true;
      return conn.reply(m.chat, `✐ Ha *desactivado* a ${botname}!`, m);
    } else if (args[0] === 'on') {
      if (!chat.isBanned) {
        return conn.reply(m.chat, `🤖*${botname}* ya estaba activado.`, m);
      }
      chat.isBanned = false;
      return conn.reply(m.chat, `✐ Ha *activado* a ${botname}!`, m);
    }
  }
};

handler.help = ['bot'];
handler.tags = ['grupo'];
handler.command = ['bot'];
handler.admin = true;

export default handler;

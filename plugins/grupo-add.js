let handler = async (m, { conn, command, text, participants }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'

  // Añadir usuario
  if (['add', 'agregar', 'añadir'].includes(command)) {
    // ... código igual que antes ...
  }

  // Invitar usuario
  if (['invitar', 'invite'].includes(command)) {
    let user = null

    if (m.quoted) {
      user = m.quoted.sender
    } else if (text) {
      if (text.includes('+'))
        return conn.reply(m.chat, `${emoji2} *Ingrese el número sin el símbolo "+" y sin espacios.*`, m)

      if (isNaN(text))
        return conn.reply(m.chat, `${emoji2} *Ingrese solo números sin letras ni símbolos.*`, m)

      let number = text.replace(/\D/g, '')
      user = `${number}@s.whatsapp.net`
    } else {
      return conn.reply(m.chat, `${emoji2} *Debe responder al mensaje del usuario o ingresar el número sin "+" ni espacios.*`, m)
    }

    try {
      m.reply('⏳ *Generando nuevo enlace de invitación...*')

      // Obtener link válido con reintentos
      let inviteLink = await getValidInviteLink(conn, m.chat)

      // Enviar invitación
      await conn.sendMessage(user, {
        text: `📩 *Has sido invitado nuevamente al grupo por @${m.sender.split('@')[0]}:*\n${inviteLink}\n\n(｡•́‿•̀｡) ¡Te esperamos!`
      }, { mentions: [m.sender] })

      m.reply(`${emoji} *Invitación enviada al usuario:* @${user.split('@')[0]}`, null, {
        mentions: [user]
      })
    } catch (e) {
      console.error(e)
      m.reply(`${emoji2} *No se pudo enviar la invitación. Es posible que el usuario tenga restricciones de privacidad.*`)
    }
  }
}

async function getValidInviteLink(conn, chatId) {
  let oldCode = await conn.groupInviteCode(chatId)
  await conn.groupRevokeInvite(chatId)
  await new Promise(resolve => setTimeout(resolve, 7000))

  for (let i = 0; i < 3; i++) {
    let newCode = await conn.groupInviteCode(chatId)
    if (newCode !== oldCode) {
      return 'https://chat.whatsapp.com/' + newCode
    }
    await new Promise(resolve => setTimeout(resolve, 3000))
  }

  return 'https://chat.whatsapp.com/' + oldCode
}

handler.help = ['add <número>', 'invitar <número o responder mensaje>']
handler.tags = ['group']
handler.command = ['add', 'agregar', 'añadir', 'invitar', 'invite']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
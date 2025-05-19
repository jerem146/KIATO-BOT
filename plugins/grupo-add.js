let handler = async (m, { conn, command, text, participants }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'

  // Variable para el usuario a agregar o invitar
  let user = null

  // ─── COMANDO ADD (AGREGAR) ───
  if (['add', 'agregar', 'añadir'].includes(command)) {
    if (m.quoted) {
      // Si respondes a un mensaje, tomamos el sender del mensaje citado
      user = m.quoted.sender
    } else if (text) {
      // Si escribes número
      if (text.includes('+'))
        return conn.reply(m.chat, `${emoji2} *Ingrese el número sin el símbolo "+" y sin espacios.*`, m)

      if (isNaN(text))
        return conn.reply(m.chat, `${emoji2} *Ingrese solo números sin letras ni símbolos.*`, m)

      let number = text.replace(/\D/g, '')
      user = `${number}@s.whatsapp.net`
    } else {
      return conn.reply(m.chat, `${emoji2} *Responda al mensaje del usuario o ingrese su número para agregar.*`, m)
    }

    let isInGroup = participants.some(p => p.id === user)
    if (isInGroup) return m.reply(`${emoji2} *El usuario ya está en el grupo.*`)

    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'add')
      m.reply(`${emoji} *Usuario agregado correctamente al grupo.*`)
    } catch (e) {
      console.error(e)
      m.reply(`${emoji2} *No se pudo agregar al usuario. Es posible que tenga restricciones de privacidad.*`)
    }
  }

  // ─── COMANDO INVITAR (ENVIAR LINK) ───
  if (['invitar', 'invite'].includes(command)) {
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
      return conn.reply(m.chat, `${emoji2} *Responda al mensaje del usuario o ingrese su número para enviar invitación.*`, m)
    }

    try {
      m.reply('⏳ *Generando nuevo enlace de invitación...*')

      // Función robusta para obtener link válido con reintentos
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

      let inviteLink = await getValidInviteLink(conn, m.chat)

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

handler.help = ['add <número> (responder mensaje)', 'invitar <número o responder mensaje>']
handler.tags = ['group']
handler.command = ['add', 'agregar', 'añadir', 'invitar', 'invite']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
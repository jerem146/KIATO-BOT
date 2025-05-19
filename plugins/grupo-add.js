let handler = async (m, { conn, command, text, participants }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'

  // ─── AÑADIR USUARIO ───
  if (['add', 'agregar', 'añadir'].includes(command)) {
    if (!text)
      return conn.reply(m.chat, `${emoji2} *Por favor, ingrese el número que desea agregar.*`, m)

    if (text.includes('+'))
      return conn.reply(m.chat, `${emoji2} *Ingrese el número sin el símbolo "+" y sin espacios.*\nEjemplo: *5219991234567*`, m)

    if (isNaN(text))
      return conn.reply(m.chat, `${emoji2} *Ingrese solo números sin letras ni símbolos.*`, m)

    let number = text.replace(/\D/g, '')
    let jid = `${number}@s.whatsapp.net`

    let existe = participants.some(p => p.id === jid)
    if (existe) {
      return m.reply(`${emoji2} *El número ya está en el grupo.*`)
    }

    try {
      await conn.groupParticipantsUpdate(m.chat, [jid], 'add')
      m.reply(`${emoji} *Usuario agregado correctamente al grupo.*`)
    } catch (e) {
      console.error(e)
      m.reply(`${emoji2} *No se pudo agregar al usuario. Es posible que tenga restricciones de privacidad.*`)
    }
  }

  // ─── INVITAR USUARIO ───
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

      // Restablecer el link
      let linkCode = await conn.groupRevokeInvite(m.chat)

      // Esperar para asegurar que el nuevo código esté activo
      await new Promise(resolve => setTimeout(resolve, 4000)) // espera 4s
      let inviteLink = 'https://chat.whatsapp.com/' + linkCode
      await new Promise(resolve => setTimeout(resolve, 5000)) // espera 5s más

      // Enviar la invitación
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

handler.help = ['add <número>', 'invitar <número o responder mensaje>']
handler.tags = ['group']
handler.command = ['add', 'agregar', 'añadir', 'invitar', 'invite']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
let handler = async (m, { conn, command, text, participants }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'

  if (command === 'add' || command === 'agregar' || command === 'añadir') {
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

  if (command === 'invitar' || command === 'invite') {
    if (!m.quoted)
      return conn.reply(m.chat, `${emoji2} *Responde al mensaje de la persona que deseas invitar nuevamente al grupo.*`, m)

    let user = m.quoted.sender
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)

    try {
      await conn.sendMessage(user, {
        text: `📩 *Has sido invitado nuevamente a unirte al grupo:*\n${link}`
      }, { quoted: m })

      m.reply(`${emoji} *Invitación enviada al usuario:* @${user.split('@')[0]}`, null, {
        mentions: [user]
      })
    } catch (e) {
      console.error(e)
      m.reply(`${emoji2} *No se pudo enviar la invitación. Es posible que el usuario tenga restricciones de privacidad.*`)
    }
  }
}

handler.help = ['add <número>', 'invitar (respondiendo)']
handler.tags = ['group']
handler.command = ['add', 'agregar', 'añadir', 'invitar', 'invite']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
let handler = async (m, { conn, command, text, participants }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'

  let user = null

  if (['add', 'agregar', 'añadir'].includes(command)) {
    if (m.quoted) user = m.quoted.sender
    else if (text) {
      if (text.includes('+'))
        return conn.reply(m.chat, `${emoji2} *Ingrese el número sin "+" y sin espacios.*`, m)
      if (isNaN(text))
        return conn.reply(m.chat, `${emoji2} *Ingrese solo números sin letras.*`, m)
      user = `${text.replace(/\D/g, '')}@s.whatsapp.net`
    } else
      return conn.reply(m.chat, `${emoji2} *Responda el mensaje o escriba número para agregar.*`, m)

    let isInGroup = participants.some(p => p.id === user)
    if (isInGroup) return m.reply(`${emoji2} *El usuario ya está en el grupo.*`)

    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'add')
      m.reply(`${emoji} *Usuario agregado correctamente.*`)
    } catch (e) {
      console.error(e)
      m.reply(`${emoji2} *No se pudo agregar al usuario.*`)
    }
  }

  if (['invitar', 'invite'].includes(command)) {
    if (m.quoted) user = m.quoted.sender
    else if (text) {
      if (text.includes('+'))
        return conn.reply(m.chat, `${emoji2} *Ingrese el número sin "+" y sin espacios.*`, m)
      if (isNaN(text))
        return conn.reply(m.chat, `${emoji2} *Ingrese solo números sin letras.*`, m)
      user = `${text.replace(/\D/g, '')}@s.whatsapp.net`
    } else
      return conn.reply(m.chat, `${emoji2} *Responda el mensaje o escriba número para invitar.*`, m)

    try {
      let code = await conn.groupInviteCode(m.chat)
      let inviteLink = 'https://chat.whatsapp.com/' + code

      await conn.sendMessage(user, {
        text: `📩 *Has sido invitado al grupo por @${m.sender.split('@')[0]}:*\n${inviteLink}\n\n(｡•́‿•̀｡) ¡Te esperamos!`
      }, { mentions: [m.sender] })

      m.reply(`${emoji} *Invitación enviada a @${user.split('@')[0]}*`, null, {
        mentions: [user]
      })
    } catch (e) {
      console.error(e)
      m.reply(`${emoji2} *No se pudo enviar la invitación.*`)
    }
  }
}

handler.help = ['add <número> (responder)', 'invitar <número o responder>']
handler.tags = ['group']
handler.command = ['add', 'agregar', 'añadir', 'invitar', 'invite']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
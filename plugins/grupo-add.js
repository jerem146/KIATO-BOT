let handler = async (m, { conn, text, participants }) => {
  const emoji = '✅'
  const emoji2 = '⚠️'

  if (!text)
    return conn.reply(m.chat, `${emoji2} *Por favor, ingrese el número que desea agregar.*`, m)

  if (text.includes('+'))
    return conn.reply(m.chat, `${emoji2} *Ingrese el número sin el símbolo "+" y sin espacios.*\nEjemplo: *5219991234567*`, m)

  if (isNaN(text))
    return conn.reply(m.chat, `${emoji2} *Ingrese solo números sin letras ni símbolos.*`, m)

  let number = text.replace(/\D/g, '')
  let jid = `${number}@s.whatsapp.net`

  // Verificar si ya está en el grupo
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

handler.help = ['add <número>']
handler.tags = ['group']
handler.command = ['add', 'agregar', 'añadir']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
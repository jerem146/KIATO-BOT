let handler = async (m, { conn, command }) => {
  const emoji = ''
  const emoji2 = ''
  const isClose = command === 'close' ? 'announcement' : 'not_announcement'

  await conn.groupSettingUpdate(m.chat, isClose)

  if (isClose === 'not_announcement') {
    m.reply(`${emoji}
  }

  if (isClose === 'announcement') {
    m.reply(`${emoji2}
  }
}

handler.help = ['open', 'close']
handler.tags = ['grupo']
handler.command = ['open', 'close']
handler.admin = true
handler.botAdmin = true

export default handler
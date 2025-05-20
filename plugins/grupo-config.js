let handler = async (m, { conn, command }) => {
  const isClose = command === 'close' ? 'announcement' : 'not_announcement'
  await conn.groupSettingUpdate(m.chat, isClose)
}

handler.help = ['open', 'close']
handler.tags = ['grupo']
handler.command = ['open', 'close']
handler.admin = true
handler.botAdmin = true

export default handler
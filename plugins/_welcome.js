import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Obtener imagen de perfil o usar una por defecto
  let ppUrl
  try {
    ppUrl = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
  } catch (e) {
    ppUrl = 'https://files.catbox.moe/xr2m6u.jpg' // Imagen por defecto
  }

  let img
  try {
    const res = await fetch(ppUrl)
    img = await res.buffer()
  } catch (e) {
    console.error('Error al obtener la imagen:', e)
    img = await (await fetch('https://files.catbox.moe/xr2m6u.jpg')).buffer()
  }

  let chat = global.db.data.chats[m.chat]
  let txt = 'ゲ◜៹ New Member ៹◞ゲ'
  let txt1 = 'ゲ◜៹ Bye Member ៹◞ゲ'
  let groupSize = participants.length

  if (m.messageStubType == 27) {
    groupSize++
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `⭑⭒꒰⚜️ 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 ⚜️꒱⭒⭑  
╭┈┈⊰ 𝑨 ${groupMetadata.subject}
├─➤ ✰ @${m.messageStubParameters[0].split`@`[0]}
╰┈➤ ${global.welcom1}

✦ 𝑨𝒉𝒐𝒓𝒂 𝒔𝒐𝒎𝒐𝒔: ${groupSize} 𝑴𝒊𝒆𝒎𝒃𝒓𝒐𝒔  
⌬•(🙄)• 𝑫𝒊𝒔𝒇𝒓𝒖𝒕𝒂 𝒕𝒖 𝒆𝒔𝒕𝒂𝒅í𝒂  
✎ Usa *#menu* para ver los comandos disponibles`
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `⭑⭒꒰☠️ 𝑨𝒅í𝒐𝒔 ⚰️꒱⭒⭑  
╭┈┈⊰ 𝑫𝒆 ${groupMetadata.subject}
├─➤ ✰ @${m.messageStubParameters[0].split`@`[0]}
╰┈➤ ${global.welcom2}

✦ 𝑸𝒖𝒆𝒅𝒂𝒎𝒐𝒔: ${groupSize} 𝑴𝒊𝒆𝒎𝒃𝒓𝒐𝒔  
⌬•(🤪)• ¡𝑻𝒆 𝒆𝒔𝒑𝒆𝒓𝒂𝒎𝒐𝒔 𝒑𝒓𝒐𝒏𝒕𝒐!  
✎ Usa *#menu* si vuelves`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }
}
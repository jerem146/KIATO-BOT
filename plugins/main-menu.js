let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
let txt = `
╭──〔 ${botname} 〕─╮
┃ 👤 Usuario : @${userId.split('@')[0]}
┃ 🚦 Estado  : ${conn.user.jid == global.conn.user.jid ? 'Bot Principal 🦾' : 'Sub-Bot 🤖'}
┃ 🕤 Uptime  : ${uptime}
┃ 👥 Usuarios: ${totalreg}
┃ 🛠️ Cmds    : ${totalCommands}
┃ 🛰️ Servidor: Multi Device
┃ 🥷 Creador : ${creador}🥷
╰─────────────────────╯
*─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ──ׄ*
*【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊  𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】*

┏━━❃「 𝐈𝐧𝐟𝐨 𝐁𝐨𝐭 」
┃ ☬ *#help • #menu*  
┃   Lista de comandos disponibles.
┃ ☬ *#uptime • #runtime*  
┃   Ver el tiempo activo de la Bot.
┃ ☬ *#staff • #colaboradores*  
┃   Desarrolladores de la Bot.
┃ ☬ *#serbot • #serbot code*  
┃   Crear una sesión de Sub-Bot.
┃ ☬ *#bots • #sockets*  
┃   Sub-Bots activos en el sistema.
┃ ☬ *#creador*  
┃   Contacto del creador de la Bot.
┃ ☬ *#status • #estado*  
┃   Estado actual de la Bot.
┃ ☬ *#links • #grupos*  
┃   Ver enlaces oficiales y grupos.
┃ ☬ *#infobot • #infobot*  
┃   Información completa de la Bot.
┃ ☬ *#sug • #newcommand*  
┃   Sugerir nuevos comandos.
┃ ☬ *#p • #ping*  
┃   Ver la velocidad de respuesta.
┃ ☬ *#reporte • #reportar*  
┃   Reportar fallos o problemas.
┃ ☬ *#sistema • #system*  
┃   Estado del sistema de la Bot.
┃ ☬ *#speed • #speedtest*  
┃   Estadísticas de velocidad.
┃ ☬ *#views • #usuarios*  
┃   Ver usuarios registrados.
┃ ☬ *#funciones • #totalfunciones*  
┃   Ver todas las funciones activas.
┃ ☬ *#ds • #fixmsgespera*  
┃   Eliminar archivos innecesarios.
┃ ☬ *#editautoresponder*  
┃   Configurar un Prompt personalizado.
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐁𝐮𝐬𝐜𝐚𝐝𝐨𝐫𝐞𝐬ᚐ 」⪨
┃ ❋ *#tiktoksearch • #tiktoks*  
┃   Buscador de videos de tiktok.
┃ ❋ *#tweetposts*  
┃.  Buscador de posts de Twitter/X.
┃ ❋ *#ytsearch • #yts*  
┃   Realiza búsquedas de Youtube.
┃ ❋ *#githubsearch*  
┃   Buscador de usuarios de GitHub.
┃ ❋ *#cuevana • #cuevanasearch*  
┃   Buscador de películas/series por Cuevana.
┃ ❋ *#google*  
┃   Realiza búsquedas por Google.
┃ ❋ *#pin • #pinterest*  
┃   Buscador de imágenes de Pinterest.
┃ ❋ *#imagen • #image*  
┃   Buscador de imágenes de Google.
┃ ❋ *#animesearch • #animess*  
┃   Buscador de animes de tioanime.
┃ ❋ *#animei • #animeinfo*  
┃   Buscador de capítulos de #animesearch.
┃ ❋ *#infoanime*  
┃   Buscador de información de anime/manga.
┃ ❋ *#hentaisearch • #searchhentai*  
┃   Buscador de capítulos hentai.
┃ ❋ *#xnxxsearch • #xnxxs*  
┃   Buscador de vídeos de Xnxx.
┃ ❋ *#xvsearch • #xvideossearch*  
┃   Buscador de vídeos de Xvideos.
┃ ❋ *#pornhubsearch • #phsearch*  
┃   Buscador de videos de Pornhub.
┃ ❋ *#npmjs*  
┃   Buscador de npmjs.
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐬 」⪨
┃ Ѽ *#tiktok • #tt*  
┃   Descarga videos de TikTok.
┃ Ѽ *#mediafire • #mf*  
┃   Descargar un archivo de MediaFire.
┃ Ѽ *#pinvid • #pinvideo* + [enlace]  
┃   Descargar vídeos de Pinterest.
┃ Ѽ *#mega • #mg* + [enlace]  
┃   Descargar un archivo de MEGA.
┃ Ѽ *#play • #play2*  
┃   Descarga música/video de YouTube.
┃ Ѽ *#ytmp3 • #ytmp4*  
┃   Descarga música/video de YouTube mediante url.
┃ Ѽ *#fb • #facebook*  
┃   Descarga videos de Facebook.
┃ Ѽ *#twitter • #x* + [Link]  
┃   Descargar un video de Twitter/X.
┃ Ѽ *#ig • #instagram*  
┃   Descarga contenido de Instagram.
┃ Ѽ *#tts • #tiktoks* + [busqueda]  
┃   Buscar videos de tiktok.
┃ Ѽ *#terabox • #tb* + [enlace]  
┃   Descargar archivos por Terabox.
┃ Ѽ *#gdrive • #drive* + [enlace]  
┃   Descargar archivos por Google Drive.
┃ Ѽ *#ttimg • #ttmp3* + <url>  
┃   Descarga fotos/audios de tiktok.
┃ Ѽ *#gitclone* + <url>  
┃   Descarga un repositorio de github.
┃ Ѽ *#xvideosdl*  
┃   Descarga videos porno de Xvideos.
┃ Ѽ *#xnxxdl*  
┃   Descarga videos porno de xnxx.
┃ Ѽ *#apk • #modapk*  
┃   Descarga un apk de Aptoide.
┃ Ѽ *#tiktokrandom • #ttrandom*  
┃   Descarga un video aleatorio de tiktok.
┃ Ѽ *#npmdl • #npmdownloader*  
┃   Descarga paquetes de NPMJs.
┃ Ѽ *#animelinks • #animedl*  
┃   Descarga Links disponibles de descargas.
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝑬𝒌𝒐𝒏𝒐𝒎𝒊𝒂 & 𝑹𝑷𝑮 」
┃ ⌘ *#w • #work • #trabajar*  
┃    Trabaja para ganar ${moneda}.
┃ ⌘ *#slut • #protituirse*  
┃    Trabaja como prostituta y gana ¥enes
┃ ⌘ *#cf • #suerte*  
┃    Apuesta tus ${moneda} a cara o cruz.
┃ ⌘ *#crime • #crimen*  
┃    Trabaja como ladrón para ganar ¥enes
┃ ⌘ *#ruleta • #roulette • #rt*  
┃    Apuesta ${moneda} al color rojo o negro.
┃ ⌘ *#casino • #apostar*  
┃    Apuesta tus ${moneda} en el casino.
┃ ⌘ *#slot*  
┃    Apuesta tus ${moneda} en la ruleta y prueba tu suerte.
┃ ⌘ *#cartera • #wallet*  
┃    Ver tus ${moneda} en la cartera.
┃ ⌘ *#banco • #bank*  
┃    Ver tus ${moneda} en el banco.
┃ ⌘ *#deposit • #depositar • #d*  
┃    Deposita tus ${moneda} al banco.
┃ ⌘ *#with • #retirar • #withdraw*  
┃    Retira tus ${moneda} del banco.
┃ ⌘ *#transfer • #pay*  
┃    Transfiere ${moneda} o XP a otros usuarios.
┃ ⌘ *#miming • #minar • #mine*  
┃    Trabaja como minero y recolecta recursos.
┃ ⌘ *#buyall • #buy*  
┃    Compra ${moneda} con tu XP.
┃ ⌘ *#daily • #diario*  
┃    Reclama tu recompensa diaria.
┃ ⌘ *#cofre*  
┃    Reclama un cofre diario lleno de recursos.
┃ ⌘ *#weekly • #semanal*  
┃    Reclama tu regalo semanal.
┃ ⌘ *#monthly • #mensual*  
┃    Reclama tu recompensa mensual.
┃ ⌘ *#steal • #robar • #rob*  
┃    Intenta robarle ${moneda} a alguien.
┃ ⌘ *#robarxp • #robxp*  
┃    Intenta robar XP a un usuario.
┃ ⌘ *#eboard • #baltop*  
┃    Ver el ranking de usuarios con más soles..
┃ ⌘ *#aventura • #adventure*  
┃    Aventúrate en un nuevo reino y recolecta recursos.
┃ ⌘ *#curar • #heal*  
┃    Cura tu salud para volverte aventurero.
┃ ⌘ *#cazar • #hunt • #berburu*  
┃    Aventúrate en una caza de animales.
┃ ⌘ *#inv • #inventario*  
┃    Ver tu inventario con todos tus ítems.
┃ ⌘ *#mazmorra • #explorar*  
┃    Explorar mazmorras para ganar ¥enes
┃ ⌘ *#halloween*  
┃    Reclama tu dulce o truco (Solo en Halloween).
┃ ⌘ *#christmas • #navidad*  
┃    Reclama tu regalo navideño (Solo en Navidad).
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩【 𝑮𝒂𝒄𝒉𝒂 】
┃ 🜲 *#rollwaifu • #rw • #roll*  
┃   Waifu o husbando aleatorio.
┃ 🜲 *#claim • #c • #reclamar*  
┃   Reclamar un personaje.
┃ 🜲 *#harem • #waifus • #claims*  
┃   Ver tus personajes reclamados.
┃ 🜲 *#charimage • #waifuimage • #wimage*  
┃   Ver una imagen aleatoria de un personaje.
┃ 🜲 *#charinfo • #winfo • #waifuinfo*  
┃   Ver información de un personaje.
┃ 🜲 *#givechar • #givewaifu • #regalar*  
┃   Regalar un personaje a otro usuario.
┃ 🜲 *#vote • #votar*  
┃   Votar por un personaje para subir su valor.
┃ 🜲 *#waifusboard • #waifustop • #topwaifus*  
┃   Ver el top de personajes con mayor valor.
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐒𝐭𝐢𝐜𝐤𝐞𝐫𝐬 」⪨:
┃ ✰ *#sticker • #s*  
┃   Crea stickers de (imagen/video).
┃ ✰ *#setmeta*  
┃   Establece un pack y autor para los stickers.
┃ ✰ *#delmeta*  
┃   Elimina tu pack de stickers.
┃ ✰ *#pfp • #getpic*  
┃  Obtén la foto de perfil de un usuario.
┃ ✰ *#qc*  
┃   Crea stickers con texto o de un usuario.
┃ ✰ *#toimg • #img*  
┃   Convierte stickers en imagen.
┃ ✰ *#brat • #ttp • #attp*  
┃   Crea stickers con texto.
┃ ✰ *#emojimix*  
┃   Fusiona 2 emojis para crear un sticker.
┃ ✰ *#wm*  
┃   Cambia el nombre de los stickers.
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩【 𝑯𝒆𝒓𝒓𝒂𝒎𝒊𝒆𝒏𝒕𝒂𝒔 】
┃ ⌘ *#calcular • #calcular • #cal*  
┃.  Calcular todo tipo de ecuaciones.
┃ ⌘ *#tiempo • #clima*  
┃   Ver el clima de un país.
┃ ⌘ *#horario*  
┃   Ver el horario global de los países.
┃ ⌘ *#fake • #fakereply*  
┃   Crea un mensaje falso de un usuario.
┃ ⌘ *#enhance • #remini • #hd*  
┃   Mejora la calidad de una imagen.
┃ ⌘ *#letra*  
┃   Cambia la fuente de las letras.
┃ ⌘ *#read • #readviewonce • #ver*  
┃   Ver imágenes de una sola vista.
┃ ⌘ *#whatmusic • #shazam*  
┃   Descubre el nombre de canciones o vídeos.
┃ ⌘ *#spamwa • #spam*  
┃   Envía spam a un usuario.
┃ ⌘ *#ss • #ssweb*  
┃   Ver el estado de una página web.
┃ ⌘ *#length • #tamaño*  
┃   Cambia el tamaño de imágenes y vídeos.
┃ ⌘ *#say • #decir* + [texto]  
┃   Repite un mensaje.
┃ ⌘ *#todoc • #todocument*  
┃   Crea documentos de (audio, imágenes y vídeos).
┃ ⌘ *#translate • #traducir • #trad*  
┃   Traduce palabras en otros idiomas.
┗━━━━━━━━━━━━━━━━━━━━⪩


┏━━⪩【 𝑷𝒓𝒐𝒇𝒊𝒍e 】
┃ ⌘ *#reg • #verificar • #register*  
┃ ➤ ✦ Registra tu nombre y edad en el bot.
┃ ⌘ *#unreg*  
┃ ➤ ✦ Elimina tu registro del bot.
┃ ⌘ *#profile*  
┃ ➤ ✦ Muestra tu perfil de usuario.
┃ ⌘ *#marry* [mención]  
┃ ➤ ✦ Propón matrimonio a otro usuario.
┃ ⌘ *#divorce*  
┃ ➤ ✦ Divorciarte de tu pareja.
┃ ⌘ *#setgenre • #setgenero*  
┃ ➤ ✦ Establece tu género en el perfil del bot.
┃ ⌘ *#delgenre • #delgenero*  
┃ ➤ ✦ Elimina tu género del perfil del bot.
┃ ⌘ *#setbirth • #setnacimiento*  
┃ ➤ ✦ Establece tu fecha de nacimiento en el perfil del bot.
┃ ⌘ *#delbirth • #delnacimiento*  
┃ ➤ ✦ Elimina tu fecha de nacimiento del perfil del bot.
┃ ⌘ *#setdescription • #setdesc*  
┃ ➤ ✦ Establece una descripción en tu perfil del bot.
┃ ⌘ *#deldescription • #deldesc*  
┃ ➤ ✦ Elimina la descripción de tu perfil del bot.
┃ ⌘ *#lb • #lboard* + <Página>  
┃ ➤ ✦ Top de usuarios con más (experiencia y nivel).
┃ ⌘ *#level • #lvl* + <@Mención>  
┃ ➤ ✦ Ver tu nivel y experiencia actual.
┃ ⌘ *#comprarpremium • #premium*  
┃ ➤ ✦ Compra un pase premium para usar el bot sin límites.
┃ ⌘ *#confesiones • #confesar*  
┃ ➤ ✦ Confiesa tus sentimientos a alguien de manera anónima.
┗━━━━━━━━━━━━━━━━━━━━⪩


┏━━⪩「 𝐆𝐫𝐮𝐩𝐨𝐬 」⪨
┃ ⌘ #config • #on
┃   Ver opciones de configuración de 
┃grupos.
┃ ⌘ #hidetag
┃  Envia un mensaje mencionando a todos los usuarios.
┃ ⌘ #gp • #infogrupo
┃   Ver la información del grupo.
┃ ⌘ #linea • #listonline
┃  Ver la lista de los usuarios en línea.
┃ ⌘ #setwelcome
┃   Establecer un mensaje de bienvenida
┃personalizado.
┃ ⌘ #setbye
┃   Establecer un mensaje de despedida 
┃personalizado.
┃ ⌘ #link
┃   El bot envía el link del grupo.
┃ ⌘ #admins • #admin
┃   Mencionar a los admins para solicitar 
┃ayuda.
┃ ⌘ #restablecer • #revoke
┃   Restablecer el enlace del grupo.
┃ ⌘ #grupo • #group [open / abrir]
┃   Cambia ajustes del grupo para que todos 
┃los usuarios envíen mensaje.
┃ ⌘ #grupo • #group [close / cerrar]
┃ ➤ ✦ Cambia ajustes del grupo para que solo 
┃los administradores envíen mensaje.
┃ ⌘ #kick [número / mención]
┃ ➤ ✦ Elimina un usuario de un grupo.
┃ ⌘ #add • #añadir • #agregar [número]
┃   Invita a un usuario a tu grupo.
┃ ⌘ #promote [mención / etiquetar]
┃   El bot da administrador al usuario 
┃mencionado.
┃ ⌘ #demote [mención / etiquetar]
┃   El bot quita administrador al usuario 
┃mencionado.
┃ ⌘ #gpbanner • #groupimg
┃   Cambiar la imagen del grupo.
┃ ⌘ #gpname • #groupname
┃   Cambiar el nombre del grupo.
┃ ⌘ #gpdesc • #groupdesc
┃   Cambiar la descripción del grupo.
┃ ⌘ #advertir • #warn • #warning
┃   Darle una advertencia a un usuario.
┃ ⌘ #unwarn • #delwarn
┃   Quitar advertencias.
┃ ⌘ #advlist • #listadv
┃   Ver lista de usuarios advertidos.
┃ ⌘ #bot on
┃   Enciende el bot en un grupo.
┃ ⌘ #bot off
┃   Apaga el bot en un grupo.
┃ ⌘ #mute [mención / etiquetar]
┃   El bot elimina los mensajes del usuario.
┃ ⌘ #unmute [mención / etiquetar]
┃   El bot deja de eliminar los mensajes del usuario.
┃ ⌘ #encuesta • #poll
┃   Crea una encuesta.
┃ ⌘ #delete • #del
┃   Elimina mensaje de otros usuarios.
┃ ⌘ #fantasmas
┃   Ver lista de inactivos del grupo.
┃ ⌘ #kickfantasmas
┃   Elimina a los inactivos del grupo.
┃ ⌘ #invocar • #tagall • #todos
┃   Invoca a todos los del un grupo.
┃ ⌘ #setemoji • #setemo
┃.  Cambia el emoji de invitación.
┃ ⌘ #listnum • #kicknum
┃   Elimina a usuarios con su prefijo +52**
┗━━━━━━━━━━━━━━━━━━━━⪩

┏━━⪩【 𝑨𝒏𝒊𝒎𝒆 】
┃ ⌘ #angry • #enojado + <mención>
┃   Estar enojado
┃ ⌘ #bite + <mención>
┃   Muerde a alguien
┃ ⌘ #bleh + <mención>
┃   Sacar la lengua
┃ ⌘ #blush + <mención>
┃   Sonrojarte
┃ ⌘ #bored • #aburrido + <mención>
┃.  Estar aburrido
┃ ⌘ #cry + <mención>
┃   Llorar por algo o alguien
┃ ⌘ #cuddle + <mención>
┃   Acurrucarse
┃ ⌘ #dance + <mención>
┃   Sacate los pasitos prohibidos
┃ ⌘ #drunk + <mención>
┃   Estar borracho
┃ ⌘ #eat • #comer + <mención>
┃   Comer algo delicioso
┃ ⌘ #facepalm + <mención>
┃   Darte una palmada en la cara
┃ ⌘ #happy • #feliz + <mención>
┃   Salta de felicidad
┃ ⌘ #hug + <mención>
┃   Dar un abrazo
┃ ⌘ #impregnate • #preg + <mención>
┃   Embarazar a alguien
┃ ⌘ #kill + <mención>
┃   Toma tu arma y mata a alguien
┃ ⌘ #kiss • #besar • #kiss2 + <mención>
┃   Dar un beso
┃ ⌘ #laugh + <mención>
┃   Reírte de algo o alguien
┃ ⌘ #lick + <mención>
┃   Lamer a alguien
┃ ⌘ #love • #amor + <mención>
┃   Sentirse enamorado
┃ ⌘ #pat + <mención>
┃   Acaricia a alguien
┃ ⌘ #poke + <mención>
┃   Picar a alguien
┃ ⌘ #pout + <mención>
┃   Hacer pucheros
┃ ⌘ #punch + <mención>
┃   Dar un puñetazo
┃ ⌘ #run + <mención>
┃   Correr
┃ ⌘ #sad • #triste + <mención>
┃   Expresar tristeza
┃ ⌘ #scared + <mención>
┃   Estar asustado
┃ ⌘ #seduce + <mención>
┃   Seducir a alguien
┃ ⌘ #shy • #timido + <mención>
┃   Sentir timidez
┃ ⌘ #slap + <mención>
┃   Dar una bofetada
┃ ⌘ #dias • #days
┃   Darle los buenos días a alguien
┃ ⌘ #noches • #nights
┃   Darle las buenas noches a alguien
┃ ⌘ #sleep + <mención>
┃   Tumbarte a dormir
┃ ⌘ #smoke + <mención>
┃   Fumar
┃ ⌘ #think + <mención>
┃   Pensar en algo
┗━━━━━━━━━━━━━━━━━━━━⪩

┏━━⪩【 𝑵𝑺𝑾𝑾 】
┃ ⌘ #anal + <mención>
┃   Hacer un anal
┃ ⌘ #waifu
┃   Buscar una waifu aleatoria
┃ ⌘ #bath + <mención>
┃   Bañarse
┃ ⌘ #blowjob • #mamada • #bj + <mención>
┃   Dar una mamada
┃ ⌘ #boobjob + <mención>
┃   Hacer una rusa
┃ ⌘ #cum + <mención>
┃   Venirse en alguien
┃ ⌘ #fap + <mención>
┃   Hacerse una paja
┃ ⌘ #ppcouple • #ppcp
┃   Genera imágenes para amistades
┃ ⌘ #footjob + <mención>
┃   Hacer una paja con los pies
┃ ⌘ #fuck • #coger • #fuck2 + <mención>
┃   Follarte a alguien
┃ ⌘ #cafe • #coffe
┃   Tomarte un cafecito con alguien
┃ ⌘ #violar • #perra + <mención>
┃   Viola a alguien
┃ ⌘ #grabboobs + <mención>
┃   Agarrar tetas
┃ ⌘ #grop + <mención>
┃   Manosear a alguien
┃ ⌘ #lickpussy + <mención>
┃   Lamer un coño
┃ ⌘ #rule34 • #r34 + [Tags]
┃   Buscar imágenes en Rule34
┃ ⌘ #sixnine • #69 + <mención>
┃.  Haz un 69 con alguien
┃ ⌘ #spank • #nalgada + <mención>
┃   Dar una nalgada
┃ ⌘ #suckboobs + <mención>
┃   Chupar tetas
┃ ⌘ #undress • #encuerar + <mención>
┃   Desnudar a alguien
┃ ⌘ #yuri • #tijeras + <mención>
┃   Hacer tijeras
┗━━━━━━━━━━━━━━━━━━━━⪩

┏━━⪩【 𝑱𝒖𝒆𝒈𝒐𝒔 】
┃ ⌘ *#amistad • #amigorandom*  
┃   Hacer amigos con un juego.
┃ ⌘ *#chaqueta • #jalamela*  
┃   Hacerte una chaqueta.
┃ ⌘ *#chiste*  
┃   La bot te cuenta un chiste.
┃ ⌘ *#consejo*  
┃   La bot te da un consejo.
┃ ⌘ *#doxeo • #doxear* + <mención>  
┃   Simular un doxeo falso.
┃ ⌘ *#facto*  
┃   La bot te lanza un facto.
┃ ⌘ *#formarpareja*  
┃   Forma una pareja.
┃ ⌘ *#formarpareja5*  
┃   Forma 5 parejas diferentes.
┃ ⌘ *#frase*  
┃   La bot te da una frase.
┃ ⌘ *#huevo*  
┃   Agárrale el huevo a alguien.
┃ ⌘ *#chupalo* + <mención>  
┃   Hacer que un usuario te la chupe.
┃ ⌘ *#aplauso* + <mención>  
┃   Aplaudirle a alguien.
┃ ⌘ *#marron* + <mención>  
┃   Burlarte del color de alguien marron.
┃ ⌘ *#suicidar*  
┃   Suicidarte.
┃ ⌘ *#iq • #iqtest* + <mención>  
┃   Calcular el IQ de alguna persona.
┃ ⌘ *#meme*  
┃   La bot te envía un meme aleatorio.
┃ ⌘ *#morse*  
┃   Convierte un texto a código morse.
┃ ⌘ *#nombreninja*  
┃   Busca un nombre ninja aleatorio.
┃ ⌘ *#paja • #pajeame*  
┃   La bot te hace una paja.
┃ ⌘ *#personalidad* + <mención>  
┃   La bot busca tu personalidad.
┃ ⌘ *#piropo*  
┃   Lanza un piropo.
┃ ⌘ *#pregunta*  
┃   Hazle una pregunta a la bot.
┃ ⌘ *#ship • #pareja*  
┃   probabilidad de enamorarte de alguien.
┃ ⌘ *#sorteo*  
┃   Empieza un sorteo.
┃ ⌘ *#top*  
┃.  Empieza un top de personas.
┃ ⌘ *#formartrio* + <mención>  
┃   Forma un trío.
┃ ⌘ *#ahorcado*  
┃   Juega con el bot el juego del ahorcado.
┃ ⌘ *#genio*  
┃   Comienza una pregunta con el genio.
┃ ⌘ *#mates • #matematicas*  
┃   Responde las preguntas de matemáticas.
┃ ⌘ *#ppt*  
┃   Juega piedra, papel o tijeras.
┃ ⌘ *#sopa • #buscarpalabra*  
┃   Juega al sopa de letras.
┃ ⌘ *#pvp • #suit* + <mención>  
┃  Juega un PVP contra otro usuario.
┃ ⌘ *#ttt*  
┃   Juega el clásico juego de tres en línea (tic tac toe).
┗━━━━━━━━━━━━━━━━━━━━⪩
  `.trim()

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: banner,
              sourceUrl: redes,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m })

}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'cmd', 'help']

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    return `${hours}h ${minutes}m ${seconds}s`
}

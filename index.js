const {
	WAConnection,
	Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    MessageType,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    waChatKey,
    mentionedJid,
    processTime
} = require("@adiwajshing/baileys")
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const { exec } = require('child_process')
const { fetchJson, color, bgcolor } = require('./lib/fetcher')
const { y2mate } = require('./lib/y2mate');
const { y2mateA, y2mateV } = require('./lib/y2mate.js')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close, uploadImages } = require('./lib/function')
const fetch = require('node-fetch')
const get = require('got')
const speednye = require('performance-now')
const fs = require('fs')
const os = require('os')
const qrcode = require('qrcode-terminal')
const moment = require('moment-timezone')
const welkom = JSON.parse(fs.readFileSync('./lib/group/welcome.json'))
const yts = require('yt-search')
const request = require('request')
const pebz = new WAConnection()
const {
	vhter,
	lol,
	naufal,
	xtem,
	dev
} = require('./lib/config.json')

prefix = '!'
fake = '𝗙𝗘𝗕𝗭𝗦𝗘𝗟𝗙\nStatus : Online'
let gambar = "" || fs.readFileSync('./media/gambar/biasa.png')
self = true
blocked = []

// SYSTEM QRCODE
pebz.ReconnectMode = 2
pebz.logger.level = 'warn'
pebz.version = [2, 2143, 8]
pebz.browserDescription = ['CikoBot', 'Safari', '3.0']
console.log('>', '[',color('Berhasil Tersambung Ke Perangkat','lime'),']','FEBSELF')
pebz.on('qr', qr => {
qrcode.generate(qr, { small : true })
console.log(color(`[ BOT ] SCAN QR DI ATAS BRO`,'white'))
})

pebz.on('credentials-updated', () => {
	const authinfo = pebz.base64EncodedAuthInfo()
	console.log('session has bim save')
	fs.writeFileSync('./pebz.json', JSON.stringify(authinfo, null, '\t'))
})
   fs.existsSync('./pebz.json') && pebz.loadAuthInfo('./pebz.json')
    pebz.connect();
   
   pebz.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	}) 
	
	pebz.on("CB:Call", json => {
		let call;
		calling = JSON.parse(JSON.stringify(json))
		call = calling[1].from
		setTimeout(function(){
			pebz.sendMessage(call, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!.\nJika ingin membuka block harap chat Owner!\nhttps//wa.me/+6285849261085', MessageType.text)
			.then(() => pebz.blockUser(call, "add"))
			}, 100);
		})
		
		
    pebz.on('group-participants-update', async(chat) => {
        try {
            mem = chat.participants[0]
            try {
                var pp_user = await pebz.getProfilePicture(mem)
            } catch (e) {
                var pp_user = 'https://www.linkpicture.com/q/20211125_113714.jpg'
            }
            try {
                var pp_group = await pebz.getProfilePicture(chat.jid)
            } catch (e) {
                var pp_group = 'https://www.linkpicture.com/q/20211125_113714.jpg'
            }
            if (chat.action == 'add') {
                ini_user = pebz.contacts[mem]
                group_info = await pebz.groupMetadata(chat.jid)
                ini_img = await getBuffer(`https://api.dapuhy.ga/api/canvas/welcome2?name=${ini_user.notify}&discriminator=${group_info.participants.length}&member=${group_info.participants.length}&gcname=${group_info.subject}&pp=${pp_user}&bg=https://www.linkpicture.com/q/20211125_113317.jpg&apikey=lordpebri`)                          
                welkam = `${ini_user.notify}, Welkam to ${group_info.subject}`
                await pebz.sendMessage(chat.jid, ini_img, MessageType.image, { caption: welkam })
            }
            if (chat.action == 'remove') {
                ini_user = pebz.contacts[mem]
                group_info = await pebz.groupMetadata(chat.jid)
                 ini_img = await getBuffer(`https://api.dapuhy.ga/api/canvas/goodbye2?name=${ini_user.notify}&discriminator=${group_info.participants.length}&member=${group_info.participants.length}&gcname=${group_info.subject}&pp=${pp_user}&bg=https://www.linkpicture.com/q/20211125_113317.jpg&apikey=lordpebri`)   
                ini_out = `${ini_user.notify}, Sayonara 👋`
                await pebz.sendMessage(chat.jid, ini_img, MessageType.image, { caption: ini_out})
            }
        } catch (e) {
            console.log('Error :', e)
        }
    })
		
		
		
	    pebz.on('chat-update', async (mek) => {
		try {
			if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.blocked
			global.prefix
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			/*const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType*/
			const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
			
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const wita = moment.tz("Asia/Makassar").format("HH:mm:ss")
			/*body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''*/
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
           
            const botNumber = pebz.user.jid
			const ownerNumber = ['6285849261085@s.whatsapp.net']
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = pebz.contacts[sender] != undefined ? pebz.contacts[sender].vname || pebz.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await pebz.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
            const isWelcome = isGroup ? welkom.includes(from):false
			const isOwner = ownerNumber.includes(sender)
			/*const sendFileFromStorage = (path, type, options) => {
pebz.sendMessage(from, fs.readFileSync(path), type, options).catch(e => {
reply('_[ ! ] Error Gagal Dalam Mengirim Media_')
console.log(e)
})
}*/
const sendFile = async (medya, namefile, capti, tag, vn) => {
  baper = await getBuffer(medya)
  mimi = ''
  if (namefile.includes('m4a')){
  pebz.sendMessage(from, baper, audio,{mimetype: 'audio/mp4',quoted: tag, filename: namefile, ptt: vn})
  }
  if (namefile.includes('mp4')){
  pebz.sendMessage(from, baper, video, {mimetype: 'video/mp4', quoted: tag, caption: capti, filename: namefile})
  }
  if (namefile.includes('gif')){
  pebz.sendMessage(from, baper, video, {mimetype: Mimetype.gif, caption: capti, quoted: tag, filename: namefile})
  } 
  if (namefile.includes('png')){
  pebz.sendMessage(from, baper, image, {quoted: tag, caption: capti, filename: namefile})
  }
  
  if (namefile.includes('webp')){
  pebz.sendMessage(from, baper, sticker, {quoted: tag})
  } else {
  kobe = namefile.split(`.`)[1]
  client.sendMessage(from, baper, document, {mimetype: kobe, quoted: tag, filename: namefile})
  }
}
const sendFileFromUrl = async(link, type, options) => {
hasil = await getBuffer(link)
pebz.sendMessage(from, hasil, type, options).catch(e => {
fetch(link).then((hasil) => {
pebz.sendMessage(from, hasil, type, options).catch(e => {
pebz.sendMessage(from, { url : link }, type, options).catch(e => {
reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
console.log(e)
})
})
})
})
}

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				pebz.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				pebz.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? pebz.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : pebz.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}  
			const sendWebp = async(from, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './trash' + names + '.png', async function () {
                    console.log('selesai');
                    let ajg = './trash' + names + '.png'
                    let palak = './trash' + names + '.webp'
                    exec(`ffmpeg -i ${ajg} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${palak}`, (err) => {
                        let media = fs.readFileSync(palak)
                        pebz.sendMessage(from, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(ajg)
                        fs.unlinkSync(palak)
                    });
                });
            }
			const sendMedia = async(from, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(from, text, mids)
                } 
                const fn = Date.now() / 10000;
                const filename = fn.toString()
                let mime = ""
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function () {
                    console.log('kelar');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    pebz.sendMessage(from, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            }
            const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
                };
                download(url, './stik' + names + '.png', async function () {
                console.log('Done Kak Pebri');
                let filess = './stik' + names + '.png'
                let asw = './stik' + names + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                let media = fs.readFileSync(asw)
                pebz.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                fs.unlinkSync(filess)
                fs.unlinkSync(asw)
                });
                });
                }			


        
	        mess = {
				wait: 'tunggu sebentar.......',
				success: 'Sucess ✓“',
				notxt: 'textnya mana ?',
				error: {
					stick: 'gagal saat konvensi gambar ke sticker',
					Iv: 'link nya mokd :v'
				},
				only: {
					group: 'Khusus Grup!',
					ownerB: 'Khusus Owner Bot',
					admin: 'Khusus Admin grup'
				}
			}
		   const lordpeb = {
	key : {
           participant : '0@s.whatsapp.net'
                        },
       message: {
                    liveLocationMessage: {
                    caption: `${pushname} ${pushname}`,
                    jpegThumbnail: gambar
                          }
                        }
                      }
           const fkontak = { 
           key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `0@s.whatsapp.net` } : {}) }, message: { 'contactMessage': { 'displayName': `Hallo Kak ${pushname}\nSilahkan Pilih Menunya`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': gambar}}}                   		
        const sendButton = async (from, context, fortext, but, mek) => {
        buttonMessages = {
        contentText: context,
        footerText: fortext,
        buttons: but,
        headerType: 1
            }
        pebz.sendMessage(from, buttonMessages, buttonsMessage, {
        quoted: fkontak
        })
        }
        const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
        const buttonMessage = {
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 1,
        };
        pebz.sendMessage(
        id,
        buttonMessage,
        MessageType.buttonsMessage,
        options
        );
        };
        const sendButImage = async (from, context, fortext, img, but, mek) => {
        jadinya = await pebz.prepareMessage(from, img, image)
        buttonMessagesI = {
        imageMessage: jadinya.message.imageMessage,
        contentText: context,
        footerText: fortext,
        buttons: but,
        headerType: 4
        }
        pebz.sendMessage(from, buttonMessagesI, buttonsMessage, {
        quoted: fkontak,
        })
        }
        async function sendButLocation(id, text1, desc1, gam1, but = [], options = {}) {
        const buttonMessages = { locationMessage: { jpegThumbnail: gam1 }, contentText: text1, footerText: desc1, buttons: but, headerType: 6 }
        return pebz.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
const time2 = moment().tz("Asia/Makassar").format("HH:mm:ss");
    if (time2 < "24:59:00") {
      var ucapanWaktu = "Selamat malam🌃";
    }
    if (time2 < "19:00:00") {
      var ucapanWaktu = "Selamat senja🌞";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "Selamat sore🌄";
    }
    if (time2 < "15:00:00") {
      var ucapanWaktu = "Selamat siang☀️";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "Selamat pagi🌅";
    }
    if (time2 < "05:00:00") {
      var ucapanWaktu = "Selamat malam🌃";
    }			
			colors = ['red','white','black','blue','yellow','green']
	     	const isMedia = (type === 'imageMessage' || type === 'videoMessage')
            const isQuotedText = type === 'extendedTextMessage' && content.includes('textMessage')
            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
           const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mPEBSELF\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
        	if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mPEBSELF\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))        	        	
            if (self === true && !isOwner && isCmd) return
          
           
             switch(command) {
             case 'menu':
             case 'help':             
		     const hiya = await fetchJson('https://xinzbot-api.herokuapp.com/api/ucapan?apikey=XinzBot&timeZone=Asia/Jakarta', {method:'get'})
		     var p = '```'
		    const tod =`${p}SELFBOT${p}
${p}${ucapanWaktu} kak ${pushname}${p}		    
${p}prefix : ${prefix}${p}`
tod2 =`
${p}➸ ${prefix}self${p}
${p}➸ ${prefix}public${p}
${p}➸ ${prefix}broadcast${p} 
${p}➸ ${prefix}sticker${p} 
${p}➸ ${prefix}sticker2${p} 
${p}➸ ${prefix}nulis <text>${p}
${p}➸ ${prefix}attp <text>${p}
${p}➸ ${prefix}play <judul lagunya>${p}
${p}➸ ${prefix}removebg <reply img>${p}
${p}➸ ${prefix}topdf <reply img>${p}

Made With❣️
`           
           but = [
          { buttonId: `${prefix}owner1`, buttonText: { displayText: 'creator' }, type: 1 },
          { buttonId: `${prefix}ruls`, buttonText: { displayText: 'rulesbot' }, type: 1 }
                  ]
        sendButLocation(from, tod, tod2, gambar, but)
           break
           
           
           case 'ruls':
txt = `
*「 PERATURAN BOT 」*

1. DILARANG TELFON BOT!!
2. DILARANG SPAM BOT
3. DILARANG BERKATA KASAR
4. DILARANG SPAM VIRTEX
5. DILARANG TELEFON OWNER
6. DILARANG SPAM GROUP
7. DILARANG SPAM ADMIN
8. DILARANG BERKATA KASAR DI GC

⚠️JIKA KALIAN MELANGGAR.. AKAN DI BLOCK + BANNED!!`
const pebz2 = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           } 
           pebz.sendMessage(from, txt, MessageType.text, pebz2)
           break
           
           
           
           case 'play':
teks = args.join(' ')
reply(mess.wait)
if (!teks.endsWith("-doc")){
resi = await yts(`${teks}`).catch(e => {
reply('_[ ! ] Error Query Yang Anda Masukan Tidak Ada_')
})
let thumbInfo = `❒「  *Youtube Search*  」
├ *Judul :* ${resi.all[0].title}
├ *ID Video :* ${resi.all[0].videoId}
├ *Diupload Pada :* ${resi.all[0].ago}
├ *Views :* ${resi.all[0].views}
├ *Durasi :* ${resi.all[0].timestamp}
├ *Channel :* ${resi.all[0].author.name}
└ *Link Channel :* ${resi.all[0].author.url}

*_Tunggu Proses Upload....._*
`
sendFileFromUrl(resi.all[0].image, image, {quoted: fkontak, caption: thumbInfo})
resi = await y2mateA(resi.all[0].url).catch(e => {
reply('_[ ! ] Error Saat Memasuki Web Y2mate *Coba Ulangi*_')
})
sendFileFromUrl(resi[0].link, audio, {quoted: fkontak, mimetype: 'audio/mp4', filename: resi[0].output})
}
if (teks.endsWith("-doc")){
const tec = teks.split("-doc")
res = await yts(`${tec}`).catch(e => {
reply('_[ ! ] Error Query Yang Anda Masukan Tidak Ada_')
})
let thumbInfo = `❒「  *${botname}*  」
├ *Judul :* ${res.all[0].title}
├ *ID Video :* ${res.all[0].videoId}
├ *Diupload Pada :* ${res.all[0].ago}
├ *Views :* ${res.all[0].views}
├ *Durasi :* ${res.all[0].timestamp}
├ *Channel :* ${res.all[0].author.name}
└ *Link Channel :* ${res.all[0].author.url}

*_Tunggu Proses Upload....._*
`
sendFileFromUrl(res.all[0].image, image, {quoted: fkontak, caption: thumbInfo})
res = await y2mateA(res.all[0].url).catch(e => {
reply('_[ ! ] Error Saat Memasuki Web Y2mate*Coba Ulangi*_')
})
sendFileFromUrl(res[0].link, document, {quoted: msg, mimetype: 'audio/mp3', filename: res[0].output})
}
break          
           case 'topdf':
           if (!isQuotedImage) return reply('image nya di reply')
           const ida = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
           const idk = await pebz.downloadMediaMessage(ida, 'buffer') 
           const getpng = await uploadImages(idk, false)  
           reply(mess.wait)
           pdf = await getBuffer(`http://lolhuman.herokuapp.com/api/convert/imgtopdf?apikey=${lol}&img=${getpng}`)
           pebz.sendMessage(from, pdf, document, { mimetype: Mimetype.pdf, quoted:mek }).catch((err) => reply('error'))
           break
           case 'removebg':
           if (!isQuotedImage) return reply('reply gambar nya') 
           const biasalah = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
           const pebzgans1  = await pebz.downloadMediaMessage(biasalah, 'buffer') 
           const getbg = await uploadImages(pebzgans1, false) 
           reply(mess.wait)
           pft = await getBuffer(`http://lolhuman.herokuapp.com/api/removebg?apikey=${lol}&img=${getbg}`)
           await pebz.sendMessage(from, pft, image, {quoted:mek,caption:'Done'}).catch((err) => reply('error ):'))
           break 
           case 'self':
           if (!isOwner) return reply(mess.only.ownerB)
           if (self === true) return 
            let pebzk = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           }
           self = true 
           let lat =`_SUCESSS_`
           pebz.sendMessage(from, lat, MessageType.text, pebzk)
           break  
           case 'status': 
           let pingnye = speednye();
           let ping = speednye() - pingnye 
           const { 
           os_version } = pebz.user.phone
           let akutext =`_「STATUS」_
*NAMA : ${pebz.user.name}*
*BROWSER : ${pebz.browserDescription[1]}*
*HOST : ${pebz.browserDescription[0]}*
*VERSI : ${pebz.browserDescription[2]}*
*HP : ${pebz.user.phone.device_manufacturer}*
*WA : ${pebz.user.phone.wa_version}*
*RAM : ${(process.memoryUsage().heapUsed / 111 / 1029 ).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1000 / 2000 )}MB*
*OS : ${os_version} ANDROID*
*SPEED : ${ping.toFixed(4)} SECOND*
` 
            let faker = {
            contextInfo: {
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            isForwarded: true,
            forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
           }
           }
           }
           }
           pebz.sendMessage(from, akutext, text, faker) 
           break
           case 'public':
           if (!isOwner) return reply(mess.only.ownerB)
           if (self === false) return 
           let pebzganskun = {
           contextInfo: {
           participant: '0@s.whatsapp.net',
           remoteJid: 'status@broadcast',
           isForwarded: true,
           forwardingScore: 8,
           quotedMessage: {
           imageMessage: {
           caption: fake,
           jpegThumbnail: gambar,
           mimetype: 'image/jpeg',
          //pageCount: 0
           }
           }
           }
           }
           self = false
           let breh =`_SUCESSS_`
           pebz.sendMessage(from, breh, MessageType.text, pebzganskun)
           break
           case 'nulis':
           try {
           if (args.length < 1) return reply(mess.notxt)
           reply(mess.wait)
           bo = args.join(' ')
           api = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${bo}&apikey=apivinz`)
           await pebz.sendMessage(from, api, image, { quoted:mek,caption:'Done!' })
           } catch(e) { 
              reply(`${e}`)
           }
           break 
            case 'takestick':
			if (!isQuotedSticker) return reply(`*Example*:\n*${prefix}takestick nama|author*`)
		    const aku = body.slice(11)
			if (!aku.includes('|')) return reply(`*Example*:\n*${prefix}takestick nama|author*`)
		    const encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
		    const media = await pebz.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
		    const packnamenye = aku.split('|')[0]
		    const authornye = aku.split('|')[1]
			exif.create(packnamenye, authornye, `aku2_${sender}`)
			exec(`webpmux -set exif ./trash/aku2_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
			if (error) return reply('*error ): coba ulangin*')
			pebz.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), MessageType.sticker, {quoted:mek})
			fs.unlinkSync(media)
		    fs.unlinkSync(`./trash/aku2_${sender}.exif`)
			})
		    break
		    var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker)) {
ger = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
owgi = await  pebz.downloadAndSaveMediaMessage(ger)
anu = await imgbb("f0b190d67308d34811fab9c56fe8aba7", owgi)
tekks = `${anu.display_url}`
anu1 = `${tekks}`
sendStickerFromUrl(from, `${anu1}`, mess.success)
} else {
reply('Gunakan foto!')
}
break   
          case 'stickerbulet':
          const encmedia1 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
          const media1 = await pebz.downloadMediaMessage(encmedia1, 'buffer') 
          const patrcik = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
	      const hayokamu = await pebz.downloadAndSaveMediaMessage(patrcik, `./trash/${sender}`)
		  getimg = await uploadImages(media1, false)
		  kamu = await getBuffer(`http://lolhuman.herokuapp.com/api/convert/towebpwround?apikey=${lol}&img=${getimg}`) 
		  const packnamenya = 'selfbot'
          const authornya = 'LordPebri'
		  exif.create(packnamenya, authornya, `biasalah_${sender}`)
		  exec(`webpmux -set exif ./trash/biasalah_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
		  await pebz.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker, {quoted:mek}).catch((err) => reply('error')) 
		  fs.unlinkSync(hayokamu)
		  fs.unlinkSync(`./trash/biasalah_${sender}.exif`)
		  })
		  break
		  case 'sticker2':
		  case 's2':
		  var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker)) {
ger = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
owgi = await  pebz.downloadAndSaveMediaMessage(ger)
anu = await imgbb("f0b190d67308d34811fab9c56fe8aba7", owgi)
tekks = `${anu.display_url}`
anu1 = `${tekks}`
sendStickerFromUrl(from, `${anu1}`, mess.success)
} else {
reply('Gunakan foto!')
}
break  
          case "sticker":
      case "stiker":
      case "sg":
      case "s":
        if (
          ((isMedia && !mek.message.videoMessage) || isQuotedImage) &&
          args.length == 0
        ) {
          const encmedia = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await pebz.downloadAndSaveMediaMessage(encmedia);
          ran = "666.webp";
          await ffmpeg(`./${media}`)
            .input(media)
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              reply("error");
            })
            .on("end", function () {
              console.log("Finish");
              pebz.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: mek,
              });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else if (
          ((isMedia && mek.message.videoMessage.seconds < 11) ||
            (isQuotedVideo &&
              mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage.seconds < 11)) &&
          args.length == 0
        ) {
          const encmedia = isQuotedVideo
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await pebz.downloadAndSaveMediaMessage(encmedia);
          ran = "999.webp";
          reply(mess.wait);
          await ffmpeg(`./${media}`)
            .inputFormat(media.split(".")[1])
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              tipe = media.endsWith(".mp4") ? "video" : "gif";
              reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`);
            })
            .on("end", function () {
              console.log("Finish");
              pebz.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: mek,
              });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else {
          reply(
            `Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`
          );
        }
        break;
           case 'owner1':
         members_ids = []
         for (let mem of groupMembers) {
         members_ids.push(mem.jid)
         }
         vcard2 = 'BEGIN:VCARD\n'
         + 'VERSION:3.0\n'
         + `FN:LordPebri\n`
         + `ORG: Creator Bot ;\n`
         + `TEL;type=CELL;type=VOICE;waid=6285849261085:6285849261085\n`
         + 'END:VCARD'.trim()
         pebz.sendMessage(from, {displayName: `Creator Bot`, vcard: vcard2}, contact, 
         { quoted: fkontak, 
         })
         reply('*_Jangan Lupa Subscrib_*\nhttps://youtube.com/c/FEBZABOTZ')
         break
          case 'bc':
         if (!isOwner) return reply('LU BUKAN OWNER GBLOK')
         if (args.length < 1) return reply('.......')
         anu = await pebz.chats.all()
         if (isMedia && !mek.message.videoMessage || isQuotedImage) {
         const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
         bc = await pebz.downloadMediaMessage(encmedia)
         for (let _ of anu) {
         pebz.sendMessage(_.jid, bc, image, { caption: `[ PebselfBot izin Broadcast ]\n\n${body.slice(4)}` })
         }
         reply('Suksess broadcast')
         } else {
         for (let _ of anu) {
         sendMess(_.jid, `[ *BOT BROADCAST* ]\n\n${body.slice(4)}`)
         }
         reply('Suksess broadcast')
         }
         break
          case 'attp':      
          if (args.length < 1) return reply(mess.notxt)
          const haw = args.join('')
          const atep = await getBuffer(`http://lolhuman.herokuapp.com/api/attp?apikey=${lol}&text=${haw}`)
          pebz.sendMessage(from, atep, sticker).catch(() => reply('error'))
          break
          default: 
          if (isCmd) {
                 reply(`Sorry bro, command *${prefix}${command}* gk ada di list *${prefix}help*`)
                    }
					if (isGroup && budy != undefined) {
				} else {
						console.log(color('[SYSTEM]','yellow'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
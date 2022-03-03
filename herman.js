const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const fs = require("fs")
const axios = require('axios')
const speed = require("performance-now")
const util = require('util')
const crypto = require('crypto')
const request = require('request')
const { exec, spawn } = require('child_process')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')

// Lib!

banChats = false;
const { fetchJosn, fetchText } = require('./lib/fetcher')
const { color, bgcolor } = require('./lib/color')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const setting = JSON.parse(fs.readFileSync('./setting.json'))

// Owner!

owner = setting.OwnerNumber
botname = setting.BotName
ownername = setting.OwnerName
fake = setting.Fake

// Module!
		
module.exports = herman = async (herman, mek, _welkom) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
    	mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
		const tanggal = moment.tz('Asia/Jakarta').format('dddd') + ', ' + moment.tz('Asia/Jakarta').format('LL')
		const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
		const timeMak = moment().tz('Asia/Makassar').format("HH:mm:ss");
        const timeJay = moment().tz('Asia/Jayapura').format("HH:mm:ss");
        const type = Object.keys(mek.message)[0]        
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '!'          	
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
		const args = body.trim().split(/ +/).slice(1)
		const arg = budy.slice(command.length + 2, budy.length)
		const c = args.join(' ')
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const Verived = "0@s.whatsapp.net"
		const txt = mek.message.conversation
		const botNumber = herman.user.jid
		const ownerNumber = [`${owner}@s.whatsapp.net`, `6285755825621@s.whatsapp.net`]
		const isGroup = from.endsWith('@g.us')
		let sender = isGroup ? mek.participant : mek.key.remoteJid
		let senderr = mek.key.fromMe ? herman.user.jid : mek.key.remoteJid.endsWith('@g.us') ? mek.participant : mek.key.remoteJid
		const groupMetadata = isGroup ? await herman.groupMetadata(from) : ''.toString
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const senderNumber = sender.split("@")[0]
        const hour_now = moment().format('HH:mm:ss')
		const conts = mek.key.fromMe ? herman.user.jid : herman.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? herman.user.name : conts.notify || conts.vname || conts.name || '-'    
		const isWelkom = isGroup ? _welkom.includes(from) : false
		const isOwner = ownerNumber.includes(sender)
		const isMybot = isOwner || mek.key.fromMe
		let bio_nya = await herman.getStatus(sender)
		try {
			bio_user = `${bio_nya.status}`
		} catch {
			bio_user = '-'
			}

// Button!

const sendButton = async (from, context, fortext, but, mek) => {
            buttonMessages = {
                contentText: context,
                footerText: fortext,
                buttons: but,
                headerType: 1
            }
            herman.sendMessage(from, buttonMessages, buttonsMessage, {
                quoted: mek
            })
        }
// Button Lokasi!
const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1
mhan = await herman.prepareMessage(from, kma, location)
const buttonMessages = {
locationMessage: mhan.message.locationMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 6
}
herman.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}

// Connect!

        const listmsg = (from, title, desc, list) => { // ngeread nya pake rowsId, jadi command nya ga keliatan
            let po = herman.prepareMessageFromContent(from, {"listMessage": {"title": title,"description": desc,"buttonText": "𝐌𝐄𝐍𝐔","footerText": `${tanggal}`,"listType": "SINGLE_SELECT","sections": list}}, {})
            return herman.relayWAMessage(po, {waitForAck: true})
        }
const reply = (teks) => {
herman.sendMessage(from, teks, text, {quoted:mek})
}
const sendMess = (hehe, teks) => {
herman.sendMessage(hehe, teks, text)
}
const fakeyt = (teks) => {
herman.sendMessage(from, teks, text,{contextInfo :{text: 'hi',
"forwardingScore": 1000000000,
isForwarded: false,
sendEphemeral: false,
"externalAdReply": {
                "title": `© - GiiXyz`,
                "body": `${botname}`,
                "mediaType": "10",
                "thumbnailUrl": "https://telegra.ph/file/64a3f4a3ea76ee25e201a.jpg",
},mentionedJid:[sender]}, quoted : mek})
};
const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }
        const mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? herman.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : herman.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } })
        }
        const costum = (pesan, tipe, target, target2) => {
			herman.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
		}
        const fakestatus = (teks) => {
            herman.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": fake,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
        const fakegroup = (teks) => {
            herman.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289523258649-1604595598@g.us" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": fake,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }

// Conection1
const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
      const buttonMessage = {
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 1,
      };
      herman.sendMessage(
        id,
        buttonMessage,
        MessageType.buttonsMessage,
        options
      );
    };
        const sendMediaURL = async(to, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(to, text, mids)
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
                    console.log('done');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    herman.sendMessage(to, media, type, { mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            } 
            
// Waktu!

		colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
      	if (!isGroup && isCmd) console.log('\x1b[1;31m[ PC\x1b[1;37m ]', '[\x1b[1;32m PRIBADI \x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
      	//if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mTEXT\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
     	if (isCmd && isGroup) console.log('\x1b[1;31m[ GC\x1b[1;37m ]', '[\x1b[1;32m GROUP \x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
      	//if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mTEXT\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
      if (!mek.key.fromMe && banChats === true) return
switch (command) {
case 'menu':
listMsg = {
buttonText: 'Menu',
footerText: `*© - ${ownername}*`,
description: `*Hii @${senderr.split('@')[0]}*`,
sections: [
{
"title": `© - GiiXyz`,
rows: [
{
"title": "[ 🖊️ ] Nulis",
"rowId": `${prefix}nulis1`
},
{
"title": "[ 🪐️ ] Sticker",
"rowId": `${prefix}stckr`
},
{
"title": "[ 🗣️ ] Owner",
"rowId": `${prefix}own`
},
{
"title": "[ 👥️ ] Group",
"rowId": `${prefix}gcmenu`
},
{
"title": "[ 📄️ ] Menu",
"rowId": `${prefix}allm`
},
{
"title": "[ 🎟 ] Sound",
"rowId": `${prefix}sound`
}
]
}],
listType: 1
}
herman.sendMessage(from, listMsg, MessageType.listMessage)
break
case 'own':
menu = `*Hii @${senderr.split("@")[0]}*

*㋡ - ${prefix}Bc*
*㋡ - ${prefix}Owner*
*㋡ - ${prefix}Mode*`
reply(menu)
break
case 'gcmenu':
menu = `*Hii @${senderr.split("@")[0]}*

*㋡ - ${prefix}Wellcome*
*㋡ - ${prefix}Kick*
*㋡ - ${prefix}LinkGroup*
*㋡ - ${prefix}Ganteng*
*㋡ - ${prefix}Cantik*`
reply(menu)
break
case 'allm':
menu = `*Hii @${senderr.split("@")[0]}*

*[ - Menu Simplle 🎟 - ]*

*- Sticker!*
*㋡ - ${prefix}Sticker*
*㋡ - ${prefix}ToImg*
*- Group!*
*㋡ - ${prefix}Wellcome*
*㋡ - ${prefix}Kick*
*㋡ - ${prefix}LinkGc*
*㋡ - ${prefix}Delete*
*㋡ - ${prefix}Ganteng*
*㋡ - ${prefix}Cantik*
*- Nulis!*
*㋡ - ${prefix}Nulis*
*㋡ - ${prefix}Folio*
*- Random!*
*㋡ - ${prefix}DarkJokes*
*㋡ - ${prefix}TebakGambar*
*㋡ - ${prefix}Quotes*
*㋡ - ${prefix}Family100*
*㋡ - ${prefix}CakLontong*
*- Owner!*
*㋡ - ${prefix}Owner*
*㋡ - ${prefix}Mode*
*㋡ - ${prefix}DellCht*
*- Sound!*
*㋡ - ${prefix}Sound*`
reply(menu)
break
case 'stckr':
menu = `*Hii @${senderr.split("@")[0]}*

*㋡ - ${prefix}Sticker*
*㋡ - ${prefix}ToImg*`
reply(menu)
break
case 'sound':
menu = `*Ketik ${prefix}Sound1 - 70*`
reply(menu)
break
case 'sound1':
case 'sound2':
case 'sound3':
case 'sound4':
case 'sound5':
case 'sound6':
case 'sound7':
case 'sound8':
case 'sound9':
case 'sound10':
case 'sound11':
case 'sound12':
case 'sound13':
case 'sound14':
case 'sound15':
case 'sound16':
case 'sound17':
case 'sound18':
case 'sound19':
case 'sound20':
case 'sound21':
case 'sound22':
case 'sound23':
case 'sound24':
case 'sound25':
case 'sound26':
case 'sound27':
case 'sound28':
case 'sound29':
case 'sound30':
case 'sound31':
case 'sound32':
case 'sound33':
case 'sound34':
case 'sound35':
case 'sound36':
case 'sound37':
case 'sound38':
case 'sound39':
case 'sound40':
case 'sound41':
case 'sound42':
case 'sound43':
case 'sound44':
case 'sound45':
case 'sound46':
case 'sound47':
case 'sound48':
case 'sound49':
case 'sound50':
case 'sound51':
case 'sound52':
case 'sound53':
case 'sound54':
case 'sound55':
case 'sound56':
case 'sound57':
case 'sound58':
case 'sound59':
case 'sound60':
case 'sound61':
case 'sound62':
case 'sound63':
case 'sound64':
case 'sound65':
case 'sound66':
case 'sound67':
case 'sound68':
case 'sound69':
case 'sound70':
case 'sound70':
omkeh = await getBuffer(`https://hansxd.nasihosting.com/sound/${command}.mp3`)
herman.sendMessage(from, omkeh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
break
case 'darkjokes':
				herman.updatePresence(from, Presence.composing) 
				 data = fs.readFileSync('./Fxc7/drak.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 darkjokes = await getBuffer(randKey.result)
                 herman.sendMessage(from, darkjokes, image, {quoted: mek, caption: '\`\`\`DARK JOKES\`\`\`'})
				break  
case 'quotes':
				herman.updatePresence(from, Presence.composing) 
				 data = fs.readFileSync('./Fxc7/quotes.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 randQuote = '*Author :* *'+randKey.author+'*\n\n*'+randKey.quotes+'*'
                 herman.sendMessage(from, randQuote, text, {quoted: mek})
					break 
case 'tebakgambar':
					data = fs.readFileSync('./Fxc7/tebakgambar.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					randSoal = await getBuffer(randKey.result.soalImg)
					setTimeout( () => {
					herman.sendMessage(from, '*➸ Jawaban :* '+ randKey.result.jawaban +'\n', text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, randSoal, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break 
case 'caklontong':
				data = fs.readFileSync('./Fxc7/caklontong.js');
				cak = JSON.parse(data);
				lontong = Math.floor(Math.random() * cak.length);
				randKey = cak[lontong];
				Pertanyaan = randKey.result.soal
				Jawaban = '\n*'+randKey.result.desc +'*'
					setTimeout( () => {
					herman.sendMessage(from, Jawaban, text, {quoted: mek})
					}, 30000)
					setTimeout( () => {
					herman.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s
					herman.sendMessage(from, Pertanyaan, text, {quoted: mek})
				break
case 'family100':
				data = fs.readFileSync('./Fxc7/family100.js');
				fami = JSON.parse(data);
				ly100 = Math.floor(Math.random() * fami.length);
				randKey = fami[ly100];
				Pertanyaan = randKey.result.soal
					setTimeout( () => {
					herman.sendMessage(from, '*➸ Jawaban :* \n```'+randKey.result.jawaban +'```', text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					  reply('_Waktu Anda Habis_')
					}, 29000)
					setTimeout( () => {
					herman.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					herman.sendMessage(from, '*'+ Pertanyaan +'*', text, {quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break 
case 'd':
        case 'del':
        case 'delete':
 
               try {
               if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*Mana Chats Yg Mau Di Delete?*')
               herman.deleteMessage(from, {id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true})
               } catch (e){
               reply('*Reply Chats?*')
}
               break
case 'toimg':      
              if (!isQuotedSticker) return reply('*Reply Sticker & Ketik !ToImg*')           
              encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await herman.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply('Gagal, pada saat mengkonversi sticker ke gambar')
              buffer = fs.readFileSync(ran)
              herman.sendMessage(from, buffer, image, {quoted: mek, caption: '*© - FucxXx Boot*'})
              fs.unlinkSync(ran)
})
              break
case 'set':
	      case 'mode':

        if (isOwner && mek.key.fromMe) return reply(mess.only.owner)
        sendButMessage(from, `*SELF / PUBLIC*`, `*© - FucxXx*`, [
          {
            buttonId: `${prefix}self`,
            buttonText: {
              displayText: `👤 SELF `,
            },
            type: 1,
          },
          {
            buttonId: `${prefix}public`,
            buttonText: {
              displayText: `👥 PUBLIC`,
            },
            type: 1,
          },
        ]);
        break;    
case 'self':

              if (isOwner && mek.key.fromMe) return reply(mess.only.owner)
              if (banChats === true) return
        	  uptime = process.uptime()
        	  banChats = true
              reply(' ```「 SELF MODE 」``` ')
              break       
case 'public':
        	  if (!mek.key.fromMe) return 
              if (banChats === false) return 
              banChats = false
              reply(' ```「 PUBLIC MODE 」``` ')
              break
case 'ganteng': 
case 'cantik':    
if (!isGroup) return reply('*Fitur Only Groups!*') 
jds = []
const A1 = groupMembers
const B1 = groupMembers
const C1 = A1[Math.floor(Math.random() * A1.length)]
D1 = `*YANG TER - ${command} DISINI ADALAH @${C1.jid.split('@')[0]}*`                  
jds.push(C1.jid)
mentions(D1, jds, true)
break
case 'nulis1':
listMsg = {
buttonText: 'Menu',
footerText: `*© - ${ownername}*`,
description: `*[ 📓 ] Nulis Menu️*`,
sections: [
{
"title": `© - GiiXyz`,
rows: [
{
"title": "[ 📓 ] Buku.",
"rowId": `${prefix}nulis`
},
{
"title": "[ 📄 ] Folio.",
"rowId": `${prefix}folio`
}
]
}],
listType: 1
}
herman.sendMessage(from, listMsg, MessageType.listMessage)
break
case 'stickergif':
			case 'stikergif':
			case 'sgif':
			case 'stiker': 
			case 'sticker':
			case 's':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await herman.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(ind.stikga())
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								herman.sendMessage(from, buffer, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await herman.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply('Wait Tod')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(ind.stikga())
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								herman.sendMessage(from, buffer, sticker, {quoted: freply})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else {
						reply(`*Kirim Gambar 🖼 Dengan Caption ${prefix}Sticker*`)
					}
					break

// OwnerMenu!

case 'owner':
members_ids = []
for (let mem of groupMembers) {
members_ids.push(mem.jid)
}
vcard2 = 'BEGIN:VCARD\n'
+ 'VERSION:3.0\n'
+ `FN:${ownername}\n`
+ `ORG: ${ownername} ;\n`
+ `TEL;type=CELL;type=VOICE;waid=${owner}:${owner}\n`
+ 'END:VCARD'.trim()
herman.sendMessage(from, {displayName: `GiiXyz`, vcard: vcard2}, contact, 
{
})
break
case 'bc':
             if (!isOwner && !mek.key.fromMe) return  reply(mess.only.owner)
             if (args.length < 1) return reply('*Fitur Khusus Owner 🗿*')
             anu100 = await herman.chats.all()
             if (isMedia && !herman.message.videoMessage || isQuotedImage) {
             const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(herman).replace('quotedM','m')).message.extendedTextMessage.contextInfo : herman
             bc100 = await herman.downloadMediaMessage(encmedia)
             for (let _ of anu100) {
             herman.sendMessage(_.jid, bc100, {caption: `*彡 - Pesan Boot - 彡*\n\n*Pesan :* ${body.slice(4)}`})
}
             } else {
             for (let _ of anu100) {
             herman.sendMessage(_.jid, 
			{"contentText": `*彡 - Pesan Boot - 彡*\n\n*Pesan :* ${body.slice(4)}`,
			"footerText": `${botname}`,
			"buttons": [
			{"buttonId": `${prefix}owner`,
			"buttonText": {"displayText": "🗣️ - Owner"
			},"type": "RESPONSE"}
			], "headerType": 1,
			}, MessageType.buttonsMessage)
}
}
             break
break
case 'linkgroup':
case 'linkgrup':
case 'linkgc':
if (!isGroup) return fakeyt(only.group)
if (!isBotGroupAdmins) return fakeyt(only.Badmin)
linkgc = await herman.groupInviteCode(from)
yeh = `*https://chat.whatsapp.com/${linkgc}*`
herman.sendMessage(from, yeh, text, { })
break
case 'kick':
if (!isGroup)
if (!isGroupAdmins && !mek.key.fromMe)
if (!isBotGroupAdmins)
if (
mek.message.extendedTextMessage === undefined ||
mek.message.extendedTextMessage === null
)
return fakeyt("*Tag Target 🎯*");
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;
if (mentioned.length > 1) {
herman.groupRemove(from, mentioned);
} else if (mentioned.length < 1) {
anu = mek.message.extendedTextMessage.contextInfo.participant;
herman.groupRemove(from, [anu]);
} else {
herman.groupRemove(from, mentioned);
}
break;
case 'nulis':{
if (args.length < 1) return reply(`*[ 📓 ] Nulis?*\n*Ketik ${prefix}Nulis & Text*`)
const tulisan = q
const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
spawn('convert', [
'./media/nulis/images/buku/sebelumkiri.jpg',
'-font',
'./media/nulis/font/Indie-Flower.ttf',
'-size',
'960x1280',
'-pointsize',
'22',
'-interline-spacing',
'2',
'-annotate',
'+140+153',
fixHeight,
'./media/nulis/images/buku/setelahkiri.jpg'
])
.on('error', () => reply(mess.eror))
.on('exit', () => {
herman.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkiri.jpg'), image, {thumbnail:Buffer.alloc(0),quoted: mek, caption: `*Dasar Pemalas. ರ_ರ*`})

})
}
break
case 'folio':{
if (args.length < 1) return reply(`*[ 📄 ] Buku Folio*\n*Ketik ${prefix}Folio & Text*`)
const tulisan = q
const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
spawn('convert', [
'./media/nulis/images/folio/sebelumkiri.jpg',
'-font',
'./media/nulis/font/Indie-Flower.ttf',
'-size',
'1720x1280',
'-pointsize',
'23',
'-interline-spacing',
'4',
'-annotate',
'+48+185',
fixHeight,
'./media/nulis/images/folio/setelahkiri.jpg'
])
.on('error', () => reply(mess.eror))
.on('exit', () => {
herman.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkiri.jpg'), image, {thumbnail:Buffer.alloc(0),quoted: mek, caption: `*Dasar Pemalas. ರ_ರ*`})

})
}
break

// Akhir!
				
default:
if (isOwner) {
if (budy.startsWith('$')){
if (!mek.key.fromMe && !isOwner) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}
if (isOwner) {
if (budy.startsWith('>')) {
console.log(color('[ EVAL ]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval return`))
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
reply(`${evaled}`)
} catch (err) {
reply(`${err}`)
}
}
}
}
}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero") && !e.includes("jid")) {
	console.log('Error : %s', color(e, 'red'))
        }
	// console.log(e)
	}
}
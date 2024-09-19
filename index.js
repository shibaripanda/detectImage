// import  tesseract  from "node-tesseract-ocr"
// import fs from 'fs'
import 'dotenv/config'
import Ocr from '@gutenye/ocr-node'
import { Telegraf } from 'telegraf'


// const  config  =  { 
//     lang : "eng" , 
//     oem : 1 , 
//     psm : 3 ,
    // load_system_dawg: 0,
    // tessedit_char_whitelist: "0123456789",
    // presets: ["tsv"]
  // }

// const img = fs.readFileSync("./img/12.jpg")
const bot = new Telegraf(process.env.BOT_TOKEN)
const ocr = await Ocr.create()
bot.on('message', async (ctx) => {
  const url = await bot.telegram.getFileLink(ctx.message.photo[3].file_id)
  const buffer = await (await fetch(url.href)).arrayBuffer()
  const result = await ocr.detect(buffer)
  for(let i of result.filter(item => ['1', '2', '3', '4', '5'].includes(item.text.split(' ')[0]) && item.text.split(' ')[1] !== '2')){
    ctx.reply(i.text.split(' ')[i.text.split(' ').length - 1])
  }
})

// const ocr = await Ocr.create()
// const result = await ocr.detect(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${ctx.message}`)
// console.log(result.filter(item => item.text.includes('18%')))
// console.log(result[10].text.split(' ')[result[10].text.split(' ').length - 1])
// console.log(result[11])
// console.log(result[12])

// console.log(img)

// tesseract 
//   .recognize(img, config) 
//   .then ((text)  =>  { 
//     console . log ( "Результат:", text) 
//   }) 
//   .catch((error)  =>  { 
//     console.log('Ошибкаэб', error.message) 
//   })
bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

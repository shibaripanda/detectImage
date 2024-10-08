import  tesseract  from "node-tesseract-ocr"
// import fs from 'fs'
import 'dotenv/config'
import Ocr from '@gutenye/ocr-node'
import { Telegraf } from 'telegraf'
import  gm  from  'gm' // . subClass ( {  imageMagick : true  } )


const  config  =  { 
    lang : "rus" , 
    oem : 1 , 
    psm : 3 ,
    // load_system_dawg: 0,
    // tessedit_char_whitelist: "0123456789",
    // presets: ["tsv"]
}
const x = 5150

gm('./img/1.JPG')
// .resizeExact(x)
// .charcoal(3)
// .quality(25)
// .paint(2)
// .chop(54, 1, 307, 1)
// .monochrome()
// .equalize()
.enhance()

// .background("#FF0000")
.colors(10)
// .noise("laplacian")

.contrast(-1)

// .enhance()
// .monochrome()


// .colorize(80, 0, 30)
// .crop(200, 155, 300, 0)
.write('./img/2.pdf', function (err) {
  if(err) console.log(err)
  else {
    tesseract.recognize('./img/2.JPG', config) 
    .then (async(text)  =>  {
      tesseract.recognize('./img/1.pdf', config) 
      .then (async(text1)  =>  {
        console.log(text)
         console.log(text.length, text1.length, x)
        // await ctx.reply(text)
        // console.log("Результат:\n", text) 
      }) 
      .catch((error)  =>  { 
        console.log('Ошибка') 
      })
      // await ctx.reply(text)
      // console.log("Результат:\n", text) 
    }) 
    .catch((error)  =>  { 
      console.log('Ошибка') 
    })}
})

const bot = new Telegraf(process.env.BOT_TOKEN)
const ocr = await Ocr.create()
bot.on('message', async (ctx) => {
  try {
    
 
  if(typeof ctx.message['photo'] !== 'undefined'){
    const time = Date.now()
    const url = await bot.telegram.getFileLink(ctx.message.photo[3].file_id)
    // const buffer = await (await fetch(url.href)).arrayBuffer()
    // console.log((Date.now() - time) / 1000 + ' ' + 'seconds getImage')
    // const result = await ocr.detect(buffer)
    // console.log((Date.now() - time) / 1000 + ' ' + 'seconds decoder')
    // for(let i of result.filter(item => item.text.split(' ').includes('796'))){
    //   const data = i.text.split(' ')
    //   console.log(i.text)
    //   await ctx.reply(`Товар № ${result.filter(item => item.text.split(' ').includes('796')).indexOf(i) + 1}` + `\nКоличество: ${data[data.length - 6]}` + `\nЦена: ${data[data.length - 5]}` + `\nСумма: ${data[data.length - 4]}` + `\nСумма с НДС: ${data[data.length - 1]}`)
    // }
    // await ctx.reply((Date.now() - time) / 1000 + ' ' + 'seconds')

    // const img = fs.readFileSync(buffer)
    tesseract.recognize(url.href, config) 
    .then (async(text)  =>  { 
      await ctx.reply(text)
      console.log("Результат:\n", text) 
    }) 
    .catch((error)  =>  { 
      console.log('Ошибка') 
    })
  }
  }catch(error){
    console.log('error')
      
    }
})



bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

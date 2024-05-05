const path = require('path')

const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const {LGTV, Keys, Apps} = require('lgtv-ip-control')




const app = express()
const server = http.createServer(app)
const io = socketio(server)
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));




app.use(express.static(path.join(__dirname, 'public')))



io.on('connection', socket =>{
    console.log('connection')


socket.on('message', mes =>{
    console.log(mes)
    button(mes)

})

socket.on('airpod', mes =>{
    console.log('airpod')
    button(mes)
})

socket.on('netflix', mes =>{
    console.log(mes)
    button(mes)
})

socket.on('up', mes =>{
    console.log(mes)
    button(mes)
})
socket.on('down', mes =>{
    console.log(mes)
    button(mes)
})
socket.on('left', mes =>{
    console.log(mes)
    button(mes)
})
socket.on('right', mes =>{
    console.log(mes)
    button(mes)
})
socket.on('ok', mes =>{
    console.log(mes)
    button(mes)
})
socket.on('back', mes =>{
    console.log(mes)
    button(mes)
})
socket.on('volDown', mes =>{
    console.log(mes)
    button(mes)
})
socket.on('volUp', mes =>{
    console.log(mes)
    button(mes)
})

socket.on('vol', mes =>{
    console.log(mes)
    button(mes)
    
    
})

socket.on('setVol', mes => {
    console.log(mes.message)
    console.log(mes.volvalue)
    button(mes.message, mes.volvalue)
})

socket.on('app', mes =>{
    console.log(mes.message)
    console.log(mes.appvar)
    button(mes.message, mes.appvar)
})




async function button(mes, vari){
   
    const tv = new LGTV('192.168.178.133', null, 'SQAOL17L')
    tv.connect()
    .then(async () => {
        try{
         switch(mes){
            case 'FUCK YOU':
                await tv.launchApp(Apps.browser)
                break;
            case 'Netflix':
                
                await tv.launchApp(Apps.netflix)
                await sleep(10000)
                await tv.sendKey(Keys.ok)
                await tv.sendKey(Keys.number5)
                await sleep(100)
                await tv.sendKey(Keys.number8)
                await sleep(100)
                await tv.sendKey(Keys.number2)
                await sleep(100)
                await tv.sendKey(Keys.number5)
                



                break;
            

            case 'App':

                
                

                await tv.launchApp(vari)

                break;
            case 'Up':
                await tv.sendKey(Keys.arrowUp);

                break;

            case 'Down':
                await tv.sendKey(Keys.arrowDown);

                break;
            case 'Left':
                await tv.sendKey(Keys.arrowLeft);

                break;
            case 'Right':
                await tv.sendKey(Keys.arrowRight);

                break;
            case 'Ok':
                await tv.sendKey(Keys.ok);

                break;
            case 'Back':
                await tv.sendKey(Keys.back)
                break;

            case 'VolUp':
                await tv.sendKey(Keys.volumeUp)
                var data = await tv.getCurrentVolume()
                socket.emit('currentvol',data)
                break;
                
            case 'VolDown':
                
                var data = await tv.getCurrentVolume()
                socket.emit('currentvol',data)

                break;
            case 'Vol':
                var data = await tv.getCurrentVolume()
              
               
                socket.emit('currentvol',data)
                
                break;

            case 'SetVol':
                await tv.setVolume(vari)
                var data = await tv.getCurrentVolume()
                
                
                socket.emit('currentvol', data)
                break;
            
            
            
            
            
            
            
            
            
                case 'Airpod':
                console.log('trig')
                await tv.sendKey(Keys.menu)
                await sleep(2000)
         
                for (let i = 0; i < 6; i++) {
                    await tv.sendKey(Keys.arrowDown)
                 }

                await tv.sendKey(Keys.ok)
                await sleep(5000)
                await tv.sendKey(Keys.arrowDown)
                await sleep(1000)
                await tv.sendKey(Keys.arrowRight)
                await sleep(1000)
                await tv.sendKey(Keys.arrowDown)
                await sleep(1000)
                await tv.sendKey(Keys.ok)
                await sleep(2000)
                await tv.sendKey(Keys.arrowDown)
                await sleep(1000)
                await tv.sendKey(Keys.arrowDown)
                await sleep(1000)
                await tv.sendKey(Keys.ok)
                await sleep(1000)
                await tv.sendKey(Keys.arrowRight)
                await sleep(1000)
                await tv.sendKey(Keys.ok)
                await sleep(1000)
                await tv.sendKey(Keys.arrowDown)
                await sleep(1000)
                await tv.sendKey(Keys.ok)
                await sleep(1000)
                await tv.sendKey(Keys.ok)
                break;
         

         }
        }catch(err){
            await console.log(err)
            await retryconnection()
        }
        
    })

    
}
})


async function retryconnection(){
    const tv = new LGTV('192.168.178.133', null, 'SQAOL17L')
    tv.connect()
    console.log('cage')
    
}
/*async function testing(){
    await sleep(1000)
 const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  await sleep(1000)
  readline.question('Who are you?', name => {
    console.log(`Hey there ${name}!`);
    readline.close();
    
    testing()
  });
}
testing()*/


  


 
const PORT = 3000

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
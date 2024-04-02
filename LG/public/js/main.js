const socket = io()

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

function lol(){
    socket.emit('message', 'FUCK YOU')
    console.log('triggerd')
}

function slider(){
    var slider = document.getElementById('slider').value
    var p = document.getElementById('vol')

    p.innerHTML = slider
}
function runapp(varapp){

    var appobject = {
        message: 'App',
        appvar: varapp
        
    }

    console.log(varapp)
    socket.emit('app', appobject)
}

function airpod(){
    socket.emit('airpod', 'Airpod')
    console.log('Airpod')
}
function ok(){
    socket.emit('ok', 'Ok')
    console.log('ok')
}
function up(){
    socket.emit('up', 'Up')
    console.log('up')
    
}
function down(){
    socket.emit('down', 'Down')
    console.log('down')
}
function left(){
    socket.emit('left', 'Left')
    console.log('left')
}
function right(){
    socket.emit('right', 'Right')
    console.log('right')
}
function netflix(){
    socket.emit('netflix', 'Netflix')
    console.log('netflix')
}
function back(){
    socket.emit('back', 'Back')
    console.log('back')
}
function vol(volume){

    var volObject = {
        message: 'SetVol',
        volvalue: volume
    }

    socket.emit('setVol', volObject)
    console.log('setVol')
    console.log(volume)

    


}
function changevol(){
    var slider = document.getElementById('slider').value
    slider = parseInt(slider)
    vol(slider)
}
function getVol(){
   
    socket.emit('vol', 'Vol')
    console.log('Getting vol')
}
socket.on('currentvol', mes =>{
    console.log(mes)
    var vol = mes
    var slider = document.getElementById('slider')
    document.getElementById('vol').innerText = vol
    slider.value = vol
    

})

/*document.addEventListener('DOMContentLoaded', (event)=>{
console.log(document.getElementById('iwannadie'))
var button = document.getElementById('iwannadie')
console.log(button)
var held = false
var counter = 0
button.addEventListener('touchstart', (event) =>{held = true})
button.addEventListener('touchend', (event)=>{held = false})

button.addEventListener('mousedown', (event) => { held = true })
button.addEventListener('mouseup', (event) => { held = false })

async function animate(){
    document.getElementById('counter').innerHTML = counter
    if (held){
        await sleep(100)
        counter++
        left()
        
    }
    else if (counter > 0){counter = 0}

    window.requestAnimationFrame(animate)
}
animate()





})*/




    getVol()

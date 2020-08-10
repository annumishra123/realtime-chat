const socket = io()

let name;

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')


do {
    name = prompt('plz Enter Name: ')
} while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    appendMessage(msg, "outgoing")
    textarea.value = ""

    socket.emit('message',msg)
}



function appendMessage(msg, type){
    let maiDiv = document.createElement('div')
    let className = type
    maiDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    maiDiv.innerHTML = markup
    messageArea.appendChild(maiDiv)

}

socket.on('message', (msg) =>{
    appendMessage(msg, 'incoming')
})
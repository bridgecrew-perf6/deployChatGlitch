const socket = io();

let user;
let chatbox = document.getElementById('chatbox');

socket.on('newUser', (data) =>{
    Swal.fire({
        title:"Identificate",
        input:"text",
        text:"Ingresa el nombre de usario que utilizarás en el chat",
        inputValidator: (value) => {
            return !value && "¡Necesitas identificarte!"
        },
        allowOutsideClick:false
    }).then(result => {
        user=result.value;
    });
})

socket.on('log', (data) => {
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message => {
        messages = messages+ `${message.user} dice: ${message.message}` `<br>`;
    })
    log.innerHTML = messages;
})

chatbox.addEventListener('keyup', (e) => {
    if (e.key === "Enter"){
        if (chatbox.value.trim().length > 0){
            socket.emit('message',{user:user,message:chatbox.value})
            chatbox.value="";
        }
    }
})
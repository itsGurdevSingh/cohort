const chatArea = document.querySelector('.chat-view')
const welcomeView = document.querySelector('.welcome-view')
const sendBtn = document.querySelector('.send-btn')
const input = document.querySelector('.input')

const socket = io();

let ischatEmpty = true;


const createMsg = (msg)=>{

    const role = msg.role == 'user'?'user-msg':'bot-msg';
    const Msg = document.createElement('div');
    Msg.classList.add(role)
    Msg.innerHTML = `
                    <div class="msg-contant">${msg.contant}</div>
                    <div class="timestamp">${msg.timestamp}</div>
    `
    chatArea.appendChild(Msg);
}

const currentTime = ()=>{
    const time = new Date()
    .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    .toLowerCase();

    return time;
}

const genResponse = (input) => {
    socket.emit('user-msg',input)
}

sendBtn.addEventListener('click',()=>{
    const msg ={
        role:'user',
        contant:input.value,
        timestamp:currentTime()
    }

    if(ischatEmpty) {
        welcomeView.style.display = 'none';
        chatArea.style.display = 'flex';
        ischatEmpty = false;
    }

    createMsg(msg)

    genResponse(input.value)

    input.value = '';

})

socket.on('bot-msg',(res)=>{
    const msg = {
        role:'bot',
        contant:res,
        timestamp:currentTime()
    }
    createMsg(msg)
})



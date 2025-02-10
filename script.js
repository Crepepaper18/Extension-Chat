const socket = io("http://localhost:9000"); 

socket.on("connect", () => {
    console.log("Connected to the server!");
})

const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('message');
const allMessages = document.getElementById('messages');

let username = prompt("Enter your username:");

socket.on('message', ({username, message}) => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${username}: </strong> ${message}`;
    allMessages.appendChild(p);
});

sendBtn.addEventListener('click', (e) => {
    const message = messageInput.value; 
    console.log(message);
    socket.emit("New message", {username, message});
    messageInput.value = "";
});
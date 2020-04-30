const socket = io('http://localHost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt("Enter a username")
appendMessage("You joined the chat room")
socket.emit('new-user', name)

socket.on('user-connected', name => {
    // sending data to containter
    appendMessage(name + " joined the chat room")
})

socket.on('user-disconnected', name => {
    // sending data to containter
    appendMessage(name + " left the chat room")
})

socket.on('chat-message', data => {
    // sending data to containter
    appendMessage(data.name + ": " + data.message)
})

messageForm.addEventListener('submit', e => {
    // prevents the server from restarting everytime and losing all chat messages
    e.preventDefault()
    // user input
    const message = messageInput.value
    // letting you see your own meassage
    appendMessage("You: " + message)
    // sending info from the client (user) to the server
    socket.emit('send-chat-message', message)
    // clear input bar
    messageInput.value = '';
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
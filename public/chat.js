// connecting with the DOM
var btn_send = document.getElementById('btn-send');
var text_user = document.getElementById('text-user');
var text_msg = document.getElementById('text-msg');
var text_area = document.getElementById('text-area');
var feedback = document.getElementById('feed');
var whoIsTyping;
//making socket instance
var socket = io.connect('');
// add event when pressing enter key
text_msg.addEventListener("keypress", (e) => {
    //checking if enter is pressed
    if(e.key === 'Enter'){
    // then sending msg
    whoIsTyping = " ";
    feedback.innerHTML = " ";
    socket.emit('typing', " ");
    btn_send.click();
    // restart who is typing 
    return; 
    }
    // emiting to to server when typing
    whoIsTyping = " is typing ..."
    socket.emit('typing', text_user.value+whoIsTyping);
});

// capturing events from the DOM
btn_send.addEventListener('click', (e) =>{
    //sending events to socket with data
    // checking first is there is content to send
    if(text_msg.value !== '')

    socket.emit('chat', {
        user: text_user.value,
        msg: text_msg.value
    });
    // cleaning msg textbox
    text_msg.value = '';
    feedback.innerHTML = " ";
    whoIsTyping = " ";
    feedback.innerHTML = " ";
    socket.emit('typing', " ");
});

socket.on('chat', (data) =>{
    //getting data and populating DOM
    text_area.innerHTML += '<p> <strong>' + data.user + ': </strong>' + data.msg + '</p> <hr>';
});

//capturing when a client is typing
socket.on('typing', (data) =>{
    feedback.textContent = `${data}`
});
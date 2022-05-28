// connecting with the DOM
btn_send = document.getElementById('btn-send');
text_user = document.getElementById('text-user');
text_msg = document.getElementById('text-msg');
text_area = document.getElementById('text-area');
//making socket instance
var socket = io.connect('');

// add event when pressing enter key
text_msg.addEventListener("keypress", (e) => {
    if(e.key === 'Enter')
    // then sending msg
    btn_send.click();
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
});

socket.on('chat', (data) =>{
    //getting data and populating DOM
    text_area.innerHTML += '<p> <strong>' + data.user + ': </strong>' + data.msg + '</p> <hr>';
});

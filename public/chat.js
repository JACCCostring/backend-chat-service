// connecting with the DOM
btn_send = document.getElementById('btn-send');
text_user = document.getElementById('text-user');
text_msg = document.getElementById('text-msg');
text_area = document.getElementById('text-area');
//making socket instance
var socket = io.connect('');

// capturing events from the DOM
btn_send.addEventListener('click', (e) =>{
    //sending events to socket with data
    socket.emit('chat', {
        user: text_user.value,
        msg: text_msg.value
    });
});

socket.on('chat', (data) =>{
    //getting data and populating DOM
    text_area.innerHTML += '<p> <strong>' + data.user + ': </strong>' + data.msg + '</p> <hr>';
});

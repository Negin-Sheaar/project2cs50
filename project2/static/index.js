document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#msgbody').style.display="none";

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // Each button should emit a "submit vote" event
        document.querySelector('#submituser').onclick = () => {
                const user = document.querySelector('#displayName').value;
                localStorage.setItem('users', user);
                document.querySelector('#loginhomepage').style.display="none";
                document.querySelector('#loginhomepage').remove;
                document.body.style.backgroundImage="none";
                document.querySelector('#msgbody').style.display="block";
                document.querySelector('#grad1').style.background = "red";
                const users = localStorage.getItem('users');
                socket.emit('submit user', {'users': users});
                return false;
            };
//when user send msg
            document.querySelector('#sendmsg').onclick = () => {
                    const msg = document.querySelector('#msgbox').value;
                    localStorage.setItem('msg', msg);
                    const users = localStorage.getItem('users');
                    socket.emit('submit msg', {'msg': msg ,'users':users});
                    return false;
                };
          });

    // When a new user is connected
    socket.on('announce user', data => {
        const li = document.createElement('li');
        li.innerHTML = `  ${data.users}`;
        document.querySelector('#users').append(li);
    });
    socket.on('announce msg', data => {
        const li = document.createElement('li');
        li.innerHTML = `  ${data.msg}`;
        document.querySelector('#msgs').append(li);
    });
});

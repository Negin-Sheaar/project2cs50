document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#msgbody').style.display="none";

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // Each button should emit a "submit vote" event
        document.querySelector('#submituser').onclick = () => {
                const users = document.querySelector('#displayName').value;
                document.querySelector('#loginhomepage').style.display="none";
                document.querySelector('#loginhomepage').remove;
                document.body.style.backgroundImage="none";
                document.querySelector('#msgbody').style.display="block";
                document.querySelector('#grad1').style.background = "red";
                socket.emit('submit user', {'users': users});
            };
          });

    // When a new vote is announced, add to the unordered list
    socket.on('announce user', data => {
        const li = document.createElement('li');
        li.innerHTML = `  ${data.users}`;
        document.querySelector('#users').append(li);
    });
});

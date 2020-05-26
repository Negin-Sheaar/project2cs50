document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // Each button should emit a "submit vote" event
        document.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                const users = document.querySelector('#displayName').value;
                socket.emit('submit user', {'users': users});
            };
        });
    });

    // When a new vote is announced, add to the unordered list
    socket.on('announce user', data => {
        const li = document.createElement('li');
        li.innerHTML = `Vote recorded: ${data.users}`;
        document.querySelector('#users').append(li);
    });
});

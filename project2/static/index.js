
//when DOM is loaded
document.addEventListener('DOMContentLoaded', ()=>{


			// Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', ()=>{
    	//load home page
      document.querySelector('#submituser').onclick  = () => {
                  const user = document.querySelector('#displayName').value;
                //  document.querySelector('#loginhomepage').style.display= "none";
                //  console.log(user);
                  socket.emit('login', {'users': user});

		};
  });
		//if user already registered

    socket.on('loadMsgPage', data=>{
      const li = document.createElement('li');
        li.innerHTML = `Vote recorded: ${data.users}`;
        document.querySelector('#usernames').append(li);
    	});
});

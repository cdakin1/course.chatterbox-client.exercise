// YOUR CODE HERE:
$(document).ready(function() {
  app.init();
});

var app = {};

var friend = [];

//Username shit
var username = window.location.search;
username = username.slice(10);
/////////

app.init = function () {
  $('.sendMessage').on('click', function(event) {
    let message = {};
    message.text = $('#clickMe').val();
    message.username = window.location.search.slice(10);
    app.send(message);
  });
  $('#posts').on('click', '.user', function(event) {
    console.log('you done clicked ma name');
    app.handleUsernameClick(this.innerText);
  });
};

app.send = function (message) {
  console.log(message, 'message');
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.clearMessages();
      app.fetch();
      // $('#posts').prepend(`<span>${username} : ${message}<br></span>`);
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      let twats = data.results;
      app.clearMessages();
      twats.forEach(function(val, i, coll) {
        $('#posts').append(`<span class='user'>${escapeHtml(twats[i].username)}</span> <span>: ${escapeHtml(twats[i].text)}<br></span>`);
      });
      // $('#posts').prepend(`<span>${data.results[0].username} : ${data.results[0].text}<br></span>`);
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#posts').html('');
};

app.renderMessage = function () {
  $('#chats').prepend('<div class="chat"><span class="username">' + message.username + '</span>: ' + message.text + ' | ' + message.roomname + '</div>');
};

app.renderRoom = function () {
  $('#roomSelect').prepend('<option> roomName </option>');
};

app.handleUsernameClick = function (something) {
  if (friend.indexOf(something) === -1) {
    friend.push(something);
  }
  console.log(friend);
};

app.handleSubmit = function () {

};

var escapeHtml = function (str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// app.fetch();
setInterval(function() {
  app.fetch();
}, 1000);

// YOUR CODE HERE:
$(document).ready(function() {
  app.init();
});

var app = {};

var friends = [];

//Username shit
var username = window.location.search;
username = username.slice(10);
/////////

app.init = function () {
  $('.sendMessage').on('click', function(event) {
    let $message = $('#clickMe').val();
    app.send($message);
  });
};

app.send = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      $('#posts').prepend(`<span>${username} : ${message}<br></span>`);
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
      app.clearMessages();
      $('#posts').prepend(`<span>${data.results[0].username} : ${data.results[0].text}<br></span>`);
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

app.handleUsernameClick = function () {
  friends.push();
};

app.handleSubmit = function () {

};

setInterval(function() {
  app.fetch();
}, 1000);

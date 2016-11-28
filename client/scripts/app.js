// YOUR CODE HERE:
var app = {};

var friends = [];



app.send = function (message) {
  console.log('sending');
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: '',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
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
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
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

app.init = function () {
  console.log('calling init');
  $('.newMessage').on('click', function() {
    console.log('clicked');
    app.send();
  });
};

app.init();

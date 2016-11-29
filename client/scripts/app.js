// YOUR CODE HERE:
$(document).ready(function() {
  app.init();
});

var app = {};

app.server = 'https://api.parse.com/1/classes/messages';
var friend = {};

//Username shit
var username = window.location.search;
username = username.slice(10);
/////////



//Username shit
var username = window.location.search;
username = username.slice(10);
/////////

app.init = function () {
  let dropdown = $('.roomList').find(':selected').text();
  $('.sendMessage').on('click', function(event) {
    let message = {};
    message.text = $('#clickMe').val();
    message.username = window.location.search.slice(10);
    message.roomName = $('.roomList').find(':selected').text();
    app.send(message);
  });
  $('.username').on('click', function() {
    app.handleUsernameClick();
  });
  $('#send .submit').on('click', function() {
    console.log('help!');
    app.handleSubmit();
  });
  $('#chats').on('click', '.user', function(event) {
    console.log('you done clicked ma name');
    app.handleUsernameClick(this.innerText);
  });
  $('.makeRoom').on('click', function(event) {
    let rum = $('#clickRoom').val();
    $('.roomList').append(`<option>${rum}</option>`);
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
      console.log(data);
      let twats = data.results;
      let dropdown = $('.roomList').find(':selected').text();
      app.clearMessages();
      twats.forEach(function(val, i, coll) {
        if (twats[i].roomName === dropdown) {
          if (friend[twats[i].username] === twats[i].username) {
            $('#chats').append(`<span class='friend'>${escapeHtml(twats[i].username)}</span> <span>: ${escapeHtml(twats[i].text)}<br></span>`);
          } else {
            $('#chats').append(`<span class='user'>${escapeHtml(twats[i].username)}</span> <span>: ${escapeHtml(twats[i].text)}<br></span>`);
          }
        }
      });

      $(dropdown).on('click', function() {

      });
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#posts').html('');
  $('#chats').html('');
};

app.renderMessage = function () {
  $('#chats').prepend('<div class="chat"><span class="username">' + message.username + '</span>: ' + message.text + ' | ' + message.roomname + '</div>');
};

app.renderRoom = function () {
  $('#roomSelect').prepend('<option> roomName </option>');
};

app.handleUsernameClick = function (something) {
  friend[something] = something;
};

app.handleSubmit = function (message) {
  app.send(message);
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

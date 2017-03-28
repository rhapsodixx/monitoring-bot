var express = require('express');
var TelegramBot = require('node-telegram-bot-api');
var axios = require('axios');

var router = express.Router();
var telegramToken = '307103339:AAHYmSkL-fF10kZC7va99dzOMVU5grASXwc';

// Setup telegram bot library
var bot = new TelegramBot(token, { polling: false });
console.log('bot server started...');

// Any kind of message
bot.on('message', function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// bots index
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Monitoring Bot Index' });
});

// webhook
router.get('/webhook', function (req, res, next) {
  res.render('index', { title: 'Monitoring Bot Webhook' });
});

router.post('/webhook', function (req, res, next) {
  var message = req.body;

  // Each message contains "text" and a "chat" object, which has an "id" which is the chat id
  if (!message || message.text.toLowerCase().indexOf('help') < 0) {
    // In case a message is not present, or if our message does not have the word help in it, do nothing and return an empty response
    return res.end()
  }

  console.log('send telegram');
  axios.post('https://api.telegram.org/bot' + telegramToken + '/sendMessage', {
    chat_id: message.chat.id,
    text: 'Polo!!'
  }).then(function (response) {
    // We get here if the message was successfully posted
    console.log('Message posted');
    res.end('ok');
  }.catch(function (err) {
    // ...and here if it was not
    console.log('Error :', err);
    res.end('Error :' + err);
  }));

});

module.exports = router;

var express = require('express');
var TelegramBot = require('node-telegram-bot-api');
var router = express.Router();
var token = '307103339:AAHYmSkL-fF10kZC7va99dzOMVU5grASXwc';

// Setup polling way
var bot = new TelegramBot(token, { polling: true });
console.log('bot server started...');

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

bot.onText(/\/status/, function (msg, match) {
  var fromId = msg.from.id;
  var insults = ["Dumbass", "Out of 100,000 sperm, you were the fastest?", "Look, you aint funny. Your life is just a joke."];
  var chosenInsult = insults[Math.floor(Math.random() * insults.length)];
  bot.sendMessage(fromId, chosenInsult);
});

bot.onText(/\/help/, function (msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, "This spectacular bot just have one single command.\n/insult - Insult you.");
});

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

module.exports = router;

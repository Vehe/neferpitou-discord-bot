const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix, token } = require('./config.json');

client.on('ready', () => {
  console.log(`Bot conectado como: ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);
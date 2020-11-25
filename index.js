const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.once('ready', () => {
  console.log('===Running===');
});

client.login(process.env.TOKEN);

client.on('message', (msg) => {
  if (msg.content === 'testing') {
    msg.channel.send('test!');
  }
});

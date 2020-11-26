require('dotenv').config();
const Discord = require('discord.js');
const commands = require('./commands/index');

const prefix = process.env.PREFIX;
const client = new Discord.Client();

client.commands = new Discord.Collection(Object.entries(commands));

client.once('ready', () => {
  console.log('===Running===');
});

client.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (!client.commands.has(cmd)) return;

  try {
    client.commands.get(cmd).execute(msg, args);
  } catch (err) {
    console.error(err);
    msg.reply('error executing command.');
  }
});

client.login(process.env.TOKEN);

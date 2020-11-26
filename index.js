require('dotenv').config();
const Discord = require('discord.js');
const commands = require('./commands');

const prefix = process.env.PREFIX;
const client = new Discord.Client();

client.commands = new Discord.Collection(Object.entries(commands));

client.once('ready', () => {
  console.log('===Running===');
});

client.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();

  if (!client.commands.has(cmdName)) return;

  const cmd = client.commands.get(cmdName);

  if (cmd.guildOnly && msg.channel.type === 'dm') {
    return msg.reply("I can't execute that command inside DMs.");
  }

  if (cmd.args && !args.length) {
    let reply = `You didn't provide any arguments, ${msg.author}.`;

    if (cmd.usage) {
      reply += `\nCorrect usage would be: \`${prefix}${cmd.name} ${cmd.usage}\``;
    }

    return msg.channel.send(reply);
  }

  try {
    cmd.execute(msg, args);
  } catch (err) {
    console.error(err);
    msg.reply('error executing command.');
  }
});

client.login(process.env.TOKEN);

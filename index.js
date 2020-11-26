const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

const prefix = process.env.PREFIX;

client.once('ready', () => {
  console.log('===Running===');
});

client.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (cmd === 'test') {
    msg.channel.send('test!');
  } else if (cmd === 'server') {
    msg.channel.send(`This server is: ${msg.guild.name}`);
  } else if (cmd === 'user-info') {
    msg.channel.send(`Username: ${msg.author.username}\nID: ${msg.author.id}`);
  } else if (cmd === 'args-info') {
    if (!args.length) {
      return msg.channel.send('no arguments provided');
    } else if (args[0] === 'foo') {
      return msg.channel.send('bar');
    }

    msg.channel.send(`First arg: ${args[0]}`);
  } else if (cmd === 'kick') {
    if (!msg.mentions.users.size) {
      return msg.reply('no user tagged');
    }
    const taggedUser = msg.mentions.users.first();

    msg.channel.send(`Kick: ${taggedUser.username}`);
  } else if (cmd === 'avatar') {
    if (!msg.mentions.users.size) {
      return msg.channel.send(
        `Your avatar: <${msg.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
        })}>`
      );
    }

    const avatarList = msg.mentions.users.map((user) => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({
        format: 'png',
        dynamic: true,
      })}>`;
    });

    msg.channel.send(avatarList);
  } else if (cmd === 'prune') {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return msg.reply('not a valid number');
    } else if (amount <= 1 || amount > 100) {
      return msg.reply('number needs to be between 1 and 100');
    }

    msg.channel
      .bulkDelete(amount, true)
      .then((msgs) => console.log(`deleted ${msgs.size} messages`))
      .catch(console.log);
  }
});

client.login(process.env.TOKEN);

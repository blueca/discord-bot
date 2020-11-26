require('dotenv').config();
const Discord = require('discord.js');
const commands = require('./commands');

const prefix = process.env.PREFIX;
const client = new Discord.Client();
const cooldowns = new Discord.Collection();

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

  if (!cooldowns.has(cmd.name)) {
    cooldowns.set(cmd.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(cmd.name);
  const cooldownAmount = (cmd.cooldown || 3) * 1000;

  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const remainingTime = (expirationTime - now) / 1000;
      return msg.reply(
        `please wait ${remainingTime.toFixed(
          1
        )} second(s) before reusing the \`${cmd.name}\` command.`
      );
    }
  }

  timestamps.set(msg.author.id, now);
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

  try {
    cmd.execute(msg, args);
  } catch (err) {
    console.error(err);
    msg.reply('error executing command.');
  }
});

client.login(process.env.TOKEN);

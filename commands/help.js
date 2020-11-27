require('dotenv').config();

const prefix = process.env.PREFIX;

module.exports = {
  name: 'help',
  description: 'list all commands, or info about a command',
  aliases: ['commands'],
  usage: ['command name'],
  cooldown: 5,
  execute(msg, args) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      data.push('list of all commands:');
      data.push(commands.map((cmd) => cmd.name).join(', '));
      data.push(
        `\nUse \`${prefix}help [command name]\` to get info about a specific command.`
      );

      return msg.author
        .send(data, { split: true })
        .then(() => {
          if (msg.channel.type === 'dm') return;
          msg.reply("I've sent you a DM with all commands");
        })
        .catch((err) => {
          console.error(`Unable to send help DM to ${msg.author.tag}.\n`, err);
          msg.reply('Unable to DM you, do you have DMs disabled?');
        });
    }

    const name = args[0].toLowerCase();
    const cmd =
      commands.get(name) ||
      commands.find((cmnd) => cmnd.aliases && cmnd.aliases.includes(name));

    if (!cmd) return msg.reply('invalid command');

    data.push(`**Name:** ${cmd.name}`);

    if (cmd.aliases) data.push(`**Aliases:** ${cmd.aliases.join(', ')}`);
    if (cmd.description) data.push(`**Description:** ${cmd.description}`);
    if (cmd.usage) data.push(`**Usage:** ${prefix}${cmd.name} ${cmd.usage}`);

    data.push(`**Cooldown:** ${cmd.cooldown || 3} second(s)`);

    msg.channel.send(data, { split: true });
  },
};

module.exports = {
  name: 'reload',
  description: 'reloads a command',
  execute(msg, args) {
    if (!args.length) {
      return msg.channel.send(
        `You didn't pass any command to reload, ${msg.author}`
      );
    }

    const cmdName = args[0].toLowerCase();
    const cmd =
      msg.client.commands.get(cmdName) ||
      msg.client.commands.find(
        (cmnd) => cmnd.aliases && cmnd.aliases.includes(cmdName)
      );

    if (!cmd) {
      return msg.channel.send(
        `There is no command with name/alias \`${cmdName}\`, ${msg.author}.`
      );
    }

    delete require.cache[require.resolve(`./${cmd.name}.js`)];

    try {
      const newCmd = require(`./${cmdName}.js`);
      msg.client.commands.set(newCmd.name, newCmd);
      msg.channel.send(`Command \`${cmd.name}\` was reloaded.`);
    } catch (err) {
      console.error(err);
      msg.channel.send(
        `Error while reloading command \`${cmd.name}\`:\n\`${err.message}\``
      );
    }
  },
};

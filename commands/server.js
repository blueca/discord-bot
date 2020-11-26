module.exports = {
  name: 'server',
  description: 'server info',
  execute(msg, args) {
    msg.channel.send(`This server is: ${msg.guild.name}`);
  },
};
